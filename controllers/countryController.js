const {Country} = require('../models/models')
const ApiError = require('../error/ApiError')
const {List_country} = require("../models/models");

class CountryController {
    async creat(req,res,next){
        try {
            const {name} =req.body
            const country = await  Country.create({name})
            return res.json(country)
        }
        catch (e) {
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAll(req,res){
        const country = await Country.findAll()
        return res.json(country)
    }
    async getOne(req,res){
        const {name}= req.params
        const add_name = name
        const all_Country = await Country.findAll()
        for (const el_all_Country of all_Country)
        {
            const {name} = el_all_Country
            if(add_name.toLowerCase() == name.toLowerCase())
            {
                return res.json(el_all_Country)
            }
        }
        return res.json(null)
    }
    async update(req,res){
        const {id, name} = req.body
        const genre = await Country.update({ name: name }, { where: { id: id } });

        return res.json(genre)
    }
    async delete(req,res){
        const {id}= req.params
        const genre = await Country.destroy({ where: { id: id } });
        return res.json(genre)
    }
    async getCompositionCountry(req,res, next){
        const {id}= req.params
        const all_Country = await List_country.findAll({where:{compositionId: id}})
        const el_list_country = []
        for (const el_all_Country of all_Country)
        {
            const {countryId} = el_all_Country
            const one_country = await Country.findAll({where: {id: countryId}})
            for (const el_one_country in one_country) {
                el_list_country.push(one_country[el_one_country])
            }
        }
        return res.json(el_list_country)
    }
}

module.exports = new CountryController()