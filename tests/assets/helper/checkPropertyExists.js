// wrapper from `node_modules/sequelize-jest-helpers/src/checks/checkPropertyExists.js`

const { sequelize, dataTypes } = require('sequelize-jest-helpers');
const each = require('jest-each').default;

const checkPropertyExists = modelPath => properties => {
  each(properties)
    .it(`Será validado que o modelo possui a propriedade '%s'`, (propName) => {
      const EntityModel = require(modelPath);
      const Entity = EntityModel(sequelize, dataTypes);

      const entity = new Entity();

      expect(entity).toHaveProperty(propName)
    })
}

module.exports = checkPropertyExists
