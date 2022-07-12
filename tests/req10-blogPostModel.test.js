const { resolve } = require('path');

const { 
  checkModelFile, 
  checkModelName, 
  checkPropertyExists, 
  checkSimpleAssociation
} = require('./assets/helper');

const { requirements } = require('../.trybe/requirements.json');

describe(requirements[9].description, () => {
  const modelPath = resolve(__dirname, '..', 'src', 'database', 'models', 'blogPost.js');
  const foreignModelPath = resolve(__dirname, '..', 'src', 'database', 'models', 'user.js');
  
  checkModelFile(modelPath);

  checkModelName(modelPath)('BlogPost');

  checkPropertyExists(modelPath)(["id","title","content","userId","published","updated"]);

  checkSimpleAssociation(modelPath)('belongsTo')('User');

  checkSimpleAssociation(foreignModelPath)('hasMany')('BlogPost');
});
