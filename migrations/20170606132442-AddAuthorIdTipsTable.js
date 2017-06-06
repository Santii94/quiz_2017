'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return  queryInterface.addColumn( 'Tips', 
                                        'AuthorId', 
                                       { type: Sequelize.STRING }
                                      );
  },

  down: function (queryInterface, Sequelize) {
       return queryInterface.removeColumn('Tips','AuthorId');
  }
};
