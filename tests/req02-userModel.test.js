const { resolve } = require('path');

const { 
  checkModelFile, 
  checkModelName, 
  checkPropertyExists 
} = require('./assets/helper');

const { requirements } = require('../.trybe/requirements.json');

describe(requirements[1].description, () => {
  const modelPath = resolve(__dirname, '..', 'src', 'database', 'models', 'user.js');
  
  checkModelFile(modelPath);

  checkModelName(modelPath)('User');

  checkPropertyExists(modelPath)(["id","displayName","email","password","image"]);
});
