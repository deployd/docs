<!--{
	title: 'Importer',
	tags: ['resource type', 'module', 'import'],
  description: 'Import collections from existing MongoDBs.'
}-->

## Importer

This custom resource type allows you to import collections from an existing MongoDB.

### Installation

Create a project. Then install the dpd-importer module.

    dpd create my-app
    cd my-app
    mkdir node_modules
    npm install dpd-importer
    dpd -d
    
In your dashboard - click the green new resource button and choose **Importer**.

Give the new resource the default name "/importer". Open it by clicking "IMPOTER" in the left menu.

Enter the information of your old MongoDB server. Clicking on **Start Import** will start creating deployd collections from data in the provided db by streaming data directly from the old db into your new deployd db. The importer will do its best to create properties based on the types it infers from your data.