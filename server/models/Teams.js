module.exports = (sequelize, DataTypes) => {

    const Teams = sequelize.define("Teams", {
        teamName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        member1: {
            type: DataTypes.INTEGER,
        },
        
        member2: {
            type: DataTypes.INTEGER,
        },

        member3: {
            type: DataTypes.INTEGER,
        }
    });

    return Teams;
}