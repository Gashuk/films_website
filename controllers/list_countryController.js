const {List_country} = require('../models/models')
const {Country} = require('../models/models')
const {Composition} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class List_countryController {
    async creat(req,res, next){
        try{
            const {compositionId, countryId} = req.body

            const list_country = await List_country.create({compositionId, countryId})

            return res.json(list_country)
        }
        catch (e){
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAll(req,res){
        const all_List_country = await List_country.findAll()
        // return res.json(all_List_profession_human)
        const new_List_genre= []
        for (const el_all_List_country of all_List_country)
        {
            const {id,createdAt,updatedAt,compositionId,countryId} = el_all_List_country
            const one_composition = await Composition.findOne({where:{id: compositionId}})
            const one_country = await Country.findOne({where:{id: countryId}})
            const new_one_List_country = {
                "id": id,
                "createdAt": createdAt,
                "updatedAt": updatedAt,
                "compositionId": compositionId,
                "name_composition": one_composition.name,
                "img_composition":  one_composition.img,
                "countryId": countryId,
                "name_country": one_country.name

            }
            new_List_genre.push(new_one_List_country)
        }
        return res.json(new_List_genre)
    }
    async update(req,res){
        const {id, compositionId, countryId} = req.body
        const list_country = await List_country.update({ compositionId: compositionId,  countryId: countryId}, { where: { id: id } });

        return res.json(list_country)
    }
    async getOne(req,res){

    }
    async delete(req,res){
        const {id}= req.params
        const list_country = await List_country.destroy({ where: { id: id } });
        return res.json(list_country)
    }
    async getOneList_country(req,res,next){
        const {compositionId,countryId}= req.params
        const list_country = await List_country.findOne({where:{compositionId:compositionId, countryId: countryId}})

        return res.json(list_country)
    }
}

module.exports = new List_countryController()