module.exports = (sequelize, DataTypes) => {

    const Hackers = sequelize.define("Hackers", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hackerPassword: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Hackers
}