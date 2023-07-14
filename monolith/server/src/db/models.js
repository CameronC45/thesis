import {DataTypes, Model} from "sequelize";

import sequelize from "./connection";

export class Advert extends Model {}
Advert.init(
{
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    shipping: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.STRING
    },
    payment: {
        allowNull: false,
        type: DataTypes.STRING
    },
    county: {
        allowNull: false,
        type: DataTypes.STRING
    },
    url: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "http://localhost:5000/images/noimage.png"
    },
    userId: {
        allowNull: false,
        type: DataTypes.STRING
    },
    fullname: {
        allowNull: false,
        type: DataTypes.STRING
    },
    
},
{
    modelName: "adverts",
    sequelize
}
);

export class Comments extends Model {}
Comments.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        comment: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        advertId: {
            allowNull: false,
            type: DataTypes.STRING
        }
    },
    {
        modelName: "comments",
        sequelize
      }
);

export class User extends Model {}
User.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        passwordHash: {
            allowNull: false,
            type: DataTypes.CHAR(64)
        },
    },
    {
        defaultScope: {
            rawAttributes: { exclude: ["passwordHash"]}
        },
        modelName: "users",
        sequelize
    }
);