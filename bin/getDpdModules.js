var request = require('superagent');
var _ = require('lodash');
var wait = new require('wait-async')();
var fs = require('fs-extra');

var modules = {};

function getPackageDetail(packageId){
  request
  .get('https://registry.npmjs.org/'+packageId)
  .end( wait(function(packageRes){
    var mod = packageRes.body;
    if (mod.time.modified >= '2013-01-01') {
      delete mod.versions;
      modules[packageId] = mod;
    } else {
      console.warn(packageId, 'is too old', mod.time.modified);
    }
  }) );
}


// Ajax search keywords 'dpd', 'dpdmodule', 'deployd' in npm
// populate outputFile for module searching
module.exports = function(outputFile, cb){

    request
    .get('https://registry.npmjs.org/-/_view/byKeyword?startkey=["dpd"]&endkey=["dpd",{}]&group_level=3')
    .end( wait(handleRes) );
    request
    .get('https://registry.npmjs.org/-/_view/byKeyword?startkey=["dpdmodule"]&endkey=["dpdmodule",{}]&group_level=3')
    .end( wait(handleRes) );
    request
    .get('https://registry.npmjs.org/-/_view/byKeyword?startkey=["deployd"]&endkey=["deployd",{}]&group_level=3')
    .end( wait(handleRes) );


    function handleRes(res){
        var data = JSON.parse(res.text);
        _.each(data.rows, function(row){
            var packageId = row.key[1];
            getPackageDetail(packageId)
        });
    }


    // TODO: modules that don't have keyword at all
    [
    'dpd-event-extension', 'dpd-s3', 'dpd-jobs', 'dpd-image-wrangler', 'dpd-fileupload', 'dpd-email', 'generator-deployd',
    'dpd-twitter-proxy', 'dpd-importer', 'dpd-curl-proxy', 'dpd-passport',
    'dpd-yeoman', 'dpd-paypal-ap', 'dpd-forecastio', 'dpd-search', 'dpd-fb-proxy', 'dpd-ses', 'dpd-actions',
    'deployd-token', 'dpd-fake-collection', 'dpd-proxy', 'dpd-imgix'
    ]
    .forEach(getPackageDetail);



    wait.then(function(){
        var json = JSON.stringify(modules, null, 2);
        // FIXME: bad to use window. But easiler at the moment
        fs.writeFileSync(outputFile , 'window.Modules = '+json );
        console.log('Write', outputFile);
        cb();
    });

}
