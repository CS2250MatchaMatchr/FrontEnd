module.exports = (sequelize, DataTypes) => {

    const Technologies = sequelize.define("Technologies", {
        hackerID: {
            type: DataTypes.INTEGER,
            notNull: false,
            unique: true
        },

        Javascript: {
            type: DataTypes.BOOLEAN,
        },

        Python: {
            type: DataTypes.BOOLEAN,
        },

        Go: {
            type: DataTypes.BOOLEAN,
        },

        Java: {
            type: DataTypes.BOOLEAN,
        },

        Kotlin: {
            type: DataTypes.BOOLEAN,
        },

        PHP: {
            type: DataTypes.BOOLEAN,
        },

        CSharp: {
            type: DataTypes.BOOLEAN,
        },

        Swift: {
            type: DataTypes.BOOLEAN,
        },

        R: {
            type: DataTypes.BOOLEAN,
        },

        Ruby: {
            type: DataTypes.BOOLEAN,
        },

        CPP: {
            type: DataTypes.BOOLEAN,
        },

        C: {
            type: DataTypes.BOOLEAN,
        },

        Matlab: {
            type: DataTypes.BOOLEAN,
        },

        Typescript: {
            type: DataTypes.BOOLEAN,
        },

        SQL: {
            type: DataTypes.BOOLEAN,
        },

        Scala: {
            type: DataTypes.BOOLEAN,
        },

        HTML: {
            type: DataTypes.BOOLEAN,
        },

        CSS: {
            type: DataTypes.BOOLEAN,
        },

        NoSQL: {
            type: DataTypes.BOOLEAN,
        },

        Rust: {
            type: DataTypes.BOOLEAN,
        },

        Perl: {
            type: DataTypes.BOOLEAN,
        },

        Other: {
            type: DataTypes.STRING,
        }

    });

    return Technologies;
}