module.exports = (sequelize, DataTypes) => {

    const Messages = sequelize.define("Messages", {
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING
        }
    })

    return Messages
}