const {Genre} = require('../models/models')
const ApiError = require('../error/ApiError')
const {List_genre} = require("../models/models");

class GenreController {
    async creat(req,res,next){
        try {
            const {name} =req.body
            const genre = await  Genre.create({name})
            return res.json(genre)
        }
        catch (e) {
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAll(req,res){
        const genre = await Genre.findAll()
        return res.json(genre)
    }
    async getOne(req,res){
        const {name}= req.params
        const add_name = name
        const all_Genre = await Genre.findAll()
        for (const el_all_Genre of all_Genre)
        {
            const {name} = el_all_Genre
            if(add_name.toLowerCase() == name.toLowerCase())
            {
                return res.json(el_all_Genre)
            }
        }
        return res.json(null)
    }

    async update(req,res){
        const {id, name} = req.body
        const genre = await Genre.update({ name: name }, { where: { id: id } });

        return res.json(genre)
    }

    async delete(req,res){
         const {id}= req.params
         const genre = await Genre.destroy({ where: { id: id } });
        return res.json(genre)
    }
    // async getAllSelect(req,res, next){
    //     const genre = await Genre.findAll()
    //     return res.json(genre)
    // }
    async getCompositionGenre(req,res, next){
        const {id}= req.params
        const all_Genre = await List_genre.findAll({where:{compositionId: id}})
        const el_list_genre = []
        for (const el_all_Genre of all_Genre)
        {
            const {genreId} = el_all_Genre
            const one_genre = await Genre.findAll({where: {id: genreId}})
            for (const el_one_genre in one_genre) {
                el_list_genre.push(one_genre[el_one_genre])
            }
        }
        return res.json(el_list_genre)
    }



}

module.exports = new GenreController()