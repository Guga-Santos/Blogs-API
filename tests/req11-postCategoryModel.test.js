const { resolve } = require('path');

const { 
  checkModelFile, 
  checkModelName, 
  checkPropertyExists, 
  checkThroughAssociation
} = require('./assets/helper');

const { requirements } = require('../.trybe/requirements.json');

describe(requirements[10].description, () => {
  const modelPath = resolve(__dirname, '..', 'src', 'database', 'models', 'postCategory.js');
  
  checkModelFile(modelPath);

  checkModelName(modelPath)('PostCategory');

  checkPropertyExists(modelPath)(["postId","categoryId"]);

  checkThroughAssociation(modelPath)
    (['Category', 'BlogPost'])('belongsToMany')(['BlogPost', 'Category']);
});
