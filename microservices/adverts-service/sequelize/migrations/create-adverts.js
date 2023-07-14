module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable("adverts", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
          },
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
            defaultValue: "http://localhost:7000/images/noimage.png"
        },
        userId: {
            allowNull: false,
            type: DataTypes.STRING
        },
        fullname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        createdAt:{
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt:{
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt:{
            allowNull: true,
            type: DataTypes.DATE
        }
    },
    {
        charset: "utf8"
    });
};

module.exports.down = queryInterface => queryInterface.dropTable("adverts");