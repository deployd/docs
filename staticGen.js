var Path = require('path');
var fs = require('fs-extra');
var glob = require('glob');
var _ = require('lodash');
var ejs = require('ejs');


var views = {};
// original views
var files = glob.sync('./views/**/*.ejs', {})
_.each(files, function(file){
    var extname = Path.extname(file);
    var basename = Path.basename(file, extname);
    views[basename] = fs.readFileSync(file, 'utf8');
});

// overrides views
views['global'] = fs.readFileSync('views-staticGen/layouts/global.ejs', 'utf8');



var app = global.app = {
}


var scope = {

    rootRelUrl: '',

    app: app,

    script: function(path){
        return '<script src="'+scope.rootRelUrl+'/javascripts/'+path+'.js"></script>';
    },
    active: function(clz){
        return clz;
    },
    partial: function(templateName, data){
        var new_data = _.defaults({
            data: data,
        }, scope);
        // console.log(templateName, Object.keys(new_data.data) );
        return ejs.render(views[templateName], new_data);
    },
}



var OutDir = Path.join(__dirname, '_site');


var Index = require('./lib/indexer');
app.index = new Index();
var index = app.index;
index.crawl('docs', function (cache) {
    app.docs = cache;
    //console.log(cache);

    // clean outDir
    fs.removeSync(OutDir);
    fs.ensureDirSync(OutDir);


    // copy assets
    var assets = glob.sync('./public/**/*.*', {})
    _.each(assets, function(asset){
        var dest = Path.join( OutDir, Path.relative('./public/', asset) );
        //console.log(asset, dest);
        fs.copySync( asset, dest );
    });
    // copy index.html
    fs.copySync( 'views-staticGen/index.html', Path.join( OutDir, 'index.html' ) );
    fs.copySync( 'public/CNAME', Path.join( OutDir, 'CNAME' ) );


    // walk start from docs/index.md
    genLink('docs/index.md');

    // some other pages
    genPage('modules', {info: app.docs['docs/using-modules/official']}, 'modules/index.html' );


    console.log('Done');
});



// recursively walk and gen all docs
var genCaches = {};
function genLink(reqUrl, include) {
    var pagekey = reqUrl;
    // url to page key
    pagekey = pagekey.replace(/#.*/, '');
    pagekey = pagekey.replace(/^\/docs/, 'docs');
    pagekey = pagekey.replace(/\/+$/, '');
    pagekey = pagekey.replace(/^\/+/, '');


    // prevent duplicate
    if (genCaches[pagekey]) return;
    genCaches[pagekey] = true;


    // include=all and normal page is two different things
    if (pagekey.indexOf('?include=all') > 0) {
        include = 'all';
        pagekey = pagekey.replace('?include=all', '');
    }


    // render examples
    if (pagekey == 'examples') {
        var examples = [];
        app.index.root().children().forEach(function (c) {
            if(c.dir) {
                c.children().forEach(function (cc) {
                    if(cc.basename() === 'examples') examples.push(cc);
                });
            }
        });

        return genPage('examples', {examples: examples}, 'examples/index.html');
    }




    // other pages
    if (['api', 'guides'].indexOf(pagekey) >= 0) {
        var info = app.docs['docs/' + pagekey];
        var root = app.index.root();
        var data = {info: info, page: pagekey, root: root};
        if(pagekey === 'api') {
            data.refs = root.subReferences();
        }
        return genPage('page', data, pagekey+'/index.html' );
    }



    // get doc info
    var info = app.docs[pagekey]
    if (!info) {
        if (!pagekey || reqUrl.match(/https?:\/\//) || reqUrl.indexOf('//') == 0 || reqUrl.indexOf('../') == 0 || reqUrl.indexOf('mailto:') == 0) {
            return;
        }
        if (['/'].indexOf(pagekey) < 0) {
            console.warn('NoInfo', reqUrl, pagekey);
        }
        return;
    }

    var destFile = info.dir ? (include == 'all' ? pagekey+'/include-all.html' : pagekey+'/index.html') : pagekey.replace(/.md$/,'.html') ;


    // gen root docs index
    if (pagekey == 'docs') {
        return;
    }
    if (pagekey == 'docs/index.md') {
        return genPage('page', {info: info}, destFile);
    }


    // gen dir
    var refs = [];
    var mainParent = info && info.mainParent();

    app.index.root().children(true).forEach(function (c) {
        if (c == mainParent) {
            c.children().forEach(function (cc) {
                var bn = cc.basename();
                if(cc.dir && bn === 'reference' || bn === 'internal-api') {
                    refs.push(cc);
                }
            });
        }
    });

    if (info.dir && include !== 'all') {
        var children = info.children(true);
        if(children) {
            for (var i=0; i < children.length; i++) {
                if(children[i].file) {
                    var info = children[i]
                    return genPage('browser', {refs: refs, info:info, include:include, current:'/'+info._path}, destFile );
                }
            };
        }
    }

    return genPage('browser', {refs: refs, info: info, include:include, current:'/'+info._path}, destFile );
}



// helper to render the md files
function genPage(page, data, outFile) {
    var outFile = Path.join( OutDir, outFile );
    var outDir = Path.dirname(outFile);
    fs.ensureDirSync(outDir);

    // relative Url to find the rootRelUrl
    var rootRelUrl = Path.relative(outDir, OutDir) || '.';
    //scope.relUrlFromRoot = Path.relative(OutDir, outDir)
    //console.log(outFile, scope.rootRelUrl);

    try {
        // XXX: the above script function need this
        scope.rootRelUrl = rootRelUrl;
        var pageOutput = ejs.render( views[page], _.defaults({
            data: data,
        }, scope) );
    } catch(e) {
        console.log('genPage Error', page);
        //console.log( e.stack );
    }
    try {
        // XXX: the above script function need this
        scope.rootRelUrl = rootRelUrl;
        var globalOutput = ejs.render( views['global'], _.defaults({
            data: data,
            body: pageOutput,
        }, scope) );
    } catch(e) {
        console.log('genPage Error', 'global');
        //console.log( e.stack );
    }


    // catch all links
    globalOutput = globalOutput.replace(/<a href="([^"]+)"/g, function(full, link){
        if (isRightUrl(link)) {
            return full;
        }
        genLink(link);
        var new_link = link.replace(/\.md(#.*)?$/, '.html$1');
        new_link = Path.normalize( Path.join( rootRelUrl , new_link ) );
        new_link = new_link.replace('?include=all', '/include-all.html');
        return '<a href="'+new_link+'"';
    });


    // catch all imgs
    globalOutput = globalOutput.replace(/<img src="([^"]+)"/g, function(full, src){
        if (isRightUrl(src)) {
            return full;
        }
        var new_src = Path.normalize( Path.join( rootRelUrl , src ) );
        return '<img src="'+new_src+'"';
    });


    //console.log('genPage', outFile);
    fs.writeFileSync(outFile, globalOutput);
}


function isRightUrl(url) {
    return url.match(/^https?:\/\//) || url.indexOf('//') == 0 || url.indexOf('../') == 0 || url.indexOf('mailto:') == 0
}
