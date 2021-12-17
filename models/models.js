const sequelize = require('../db')
const DataTypes = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fio: {type: DataTypes.STRING},
    img:{type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, allowNull:false},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Profession = sequelize.define('profession',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
})
const Human = sequelize.define('human',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fio:{type: DataTypes.STRING, allowNull:false},
    img:{type: DataTypes.STRING}
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
})

const Genre = sequelize.define('genre',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
})

const Country = sequelize.define('country',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
})

const Review = sequelize.define('review',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull:false},
    text:{type: DataTypes.STRING, allowNull:false}
})

const Composition = sequelize.define('composition',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
    description:{type: DataTypes.STRING},
    img:{type: DataTypes.STRING},
    year1:{type: DataTypes.DATE},
    year2:{type: DataTypes.DATE},
    number_seasons:{type: DataTypes.INTEGER},
    rating:{type: DataTypes.INTEGER, defaultValue: 0}
})

const Rating = sequelize.define('rating',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate:{type: DataTypes.INTEGER, allowNull:false}

})

const List_profession_human = sequelize.define('list_profession_human',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const List_composition_human = sequelize.define('list_composition_human',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const List_genre = sequelize.define('list_genre',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const List_country = sequelize.define('list_country',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Type.hasMany(Composition)
Composition.belongsTo(Type)

Composition.hasMany(Review)
Review.belongsTo(Composition)

Composition.hasMany(Rating)
Rating.belongsTo(Composition)

Human.hasMany(List_profession_human)
List_profession_human.belongsTo(Human)

Profession.hasMany(List_profession_human)
List_profession_human.belongsTo(Profession)

List_profession_human.hasMany(List_composition_human)
List_composition_human.belongsTo(List_profession_human)

Composition.hasMany(List_composition_human)
List_composition_human.belongsTo(Composition)

Composition.hasMany(List_genre)
List_genre.belongsTo(Composition)

Genre.hasMany(List_genre)
List_genre.belongsTo(Genre)

Composition.hasMany(List_country)
List_country.belongsTo(Composition)

Country.hasMany(List_country)
List_country.belongsTo(Country)

module.exports = {
    User,
    Rating,
    Country,
    Review,
    Profession,
    Type,
    Composition,
    Genre,
    Human,
    List_country,
    List_genre,
    List_profession_human,
    List_composition_human
}



