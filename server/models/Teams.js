module.exports = (sequelize, DataTypes) => {

    const Teams = sequelize.define("Teams", {
        teamName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        owner: {
            type: DataTypes.INTEGER,
        },

        member1: {
            type: DataTypes.INTEGER,
        },

        member2: {
            type: DataTypes.INTEGER,
        },

        member3: {
            type: DataTypes.INTEGER,
        },

        passcode: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Teams;
}