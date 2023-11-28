module.exports = (sequelize, DataTypes) => {

    const Hackers = sequelize.define("Hackers", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hackerPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        classStanding: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        school: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        frontOrBackEnd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        github: {
            type: DataTypes.STRING,
        },
        linkedIn: {
            type: DataTypes.STRING
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lookingForTeam: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    })

    return Hackers
}