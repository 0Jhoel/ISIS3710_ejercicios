const { DataTypes, Model} = require("sequelize");

const sequelize = require("../lib/sequelize");

class Message extends Model {}

Message.init(
    {
        ts:{
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull : false
        },
        message: {
            type: DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize,
        modelName: "Message",
        timestamps: false
    }
);

Message.sync();

module.exports = Message;