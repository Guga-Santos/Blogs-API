const { resolve } = require('path');

const { 
  checkModelFile, 
  checkModelName, 
  checkPropertyExists 
} = require('./assets/helper');

const { requirements } = require('../.trybe/requirements.json');

describe(requirements[6].description, () => {
  const modelPath = resolve(__dirname, '..', 'src', 'database', 'models', 'category.js');
  
  checkModelFile(modelPath);

  checkModelName(modelPath)('Category');

  checkPropertyExists(modelPath)(["id","name"]);
});
