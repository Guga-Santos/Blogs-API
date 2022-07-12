// wrapper from `node_modules/sequelize-jest-helpers/src/checks/checkModelName.js`

const { sequelize, dataTypes } = require('sequelize-jest-helpers');

const checkModelName = modelPath => modelName => {
  it(`Será validado que o modelo possui o nome '${modelName}'`, () => {
    const EntityModel = require(modelPath);
    const Entity = EntityModel(sequelize, dataTypes);

    expect(Entity.modelName).toBe(modelName);
  })
}

module.exports = checkModelName
