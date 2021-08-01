'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

        models.Comment.belongsTo(models.User,{
          foreignKey:{

            name:"userId",
            allowNull:false,

          },


        });

        models.Comment.belongsTo(models.Message, {
          foreignKey:{

            name:"messageId",
            allowNull:false,


          },


        });




    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};