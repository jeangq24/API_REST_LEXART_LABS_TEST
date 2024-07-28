const { DataTypes } = require('sequelize');
const logger = require('../lib/logs');
const { STRING, INTEGER, DATE } = DataTypes;
const Person = (sequelize) => {
    try {
        sequelize.define('Person', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            name: {
                type: STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'The name field cannot be empty'
                    }
                }
            },
            last_name: {
                type: STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'The last name field cannot be empty'
                    }
                }
            },
            birthdate: {
                type: STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'The birthdate field cannot be empty'
                    }
                }
            }
        }, {
            timestamps: false,
            hooks: {
                afterValidate: (person, options) => {
                    logger.info(`Validation completed for person: ${person}`);
                }
            }
        });

        logger.info('Person model has been defined successfully.');
    } catch (error) {
        logger.error('Error defining Person model:', error);
    }
};
module.exports = Person;
