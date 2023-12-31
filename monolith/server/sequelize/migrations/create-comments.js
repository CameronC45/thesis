module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable("comments", {
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

module.exports.down = queryInterface => queryInterface.dropTable("comments");