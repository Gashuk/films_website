const {List_genre} = require('../models/models')
const {Genre} = require('../models/models')
const {Composition} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class List_genreController {
    async creat(req,res, next){
        try{
            const {compositionId, genreId} = req.body

            const list_genre = await List_genre.create({compositionId, genreId})

            return res.json(list_genre)
        }
        catch (e){
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAll(req,res){
        const all_List_genre = await List_genre.findAll()
        // return res.json(all_List_profession_human)
        const new_List_genre= []
        for (const el_all_List_genre of all_List_genre)
        {
            const {id,createdAt,updatedAt,compositionId,genreId} = el_all_List_genre
            const one_composition = await Composition.findOne({where:{id: compositionId}})
            const one_genre = await Genre.findOne({where:{id: genreId}})
            const new_one_List_genre = {
                "id": id,
                "createdAt": createdAt,
                "updatedAt": updatedAt,
                "compositionId": compositionId,
                "name_composition": one_composition.name,
                "img_composition":  one_composition.img,
                "genreId": genreId,
                "name_genre": one_genre.name

            }
            new_List_genre.push(new_one_List_genre)
        }
        return res.json(new_List_genre)
    }
    async update(req,res){
        const {id, compositionId, genreId} = req.body
        const list_genre = await List_genre.update({ compositionId: compositionId,  genreId: genreId}, { where: { id: id } });

        return res.json(list_genre)
    }
    async getOne(req,res){

    }
    async delete(req,res){
        const {id}= req.params
        const list_genre = await List_genre.destroy({ where: { id: id } });
        return res.json(list_genre)
    }
    async getOneList_genre(req,res,next){
        return res.json("list_genre")
        let {compositionId,genreId}= req.query
        // return res.json(compositionId + " " + genreId)
        if(compositionId == null && genreId != null)
        {

            const list_genre = await List_genre.findOne({where:{genreId: genreId}})
            return res.json(list_genre)
        }
        else
        {
            const list_genre = await List_genre.findOne({where:{compositionId:compositionId, genreId: genreId}})
            return res.json(list_genre)
        }
    }
}

module.exports = new List_genreController()