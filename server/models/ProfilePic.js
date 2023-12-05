module.exports = (sequelize, DataTypes) => {

    const ProfilePic = sequelize.define("ProfilePic", {
        hackerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        imageAddress: {
            type: DataTypes.STRING,
        }
    })

    return ProfilePic
}