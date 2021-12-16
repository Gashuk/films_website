const {Profession} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProfessionController {
    async creat(req,res,next){
        try {
            const {name} =req.body
            const profession = await  Profession.create({name})
            return res.json(profession)
        }
        catch (e) {
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAllProfession(req, res){
        const professions = await Profession.findAll()
        return res.json(professions)
    }
    async getOne(req,res){
        const {name}= req.params
        const add_name = name
        const all_Profession = await Profession.findAll()
        for (const el_all_Profession of all_Profession)
        {
            const {name} = el_all_Profession
            if(add_name.toLowerCase() == name.toLowerCase())
            {
                return res.json(el_all_Profession)
            }
        }
        return res.json(null)
    }
    async update(req,res){
        const {id, name} = req.body
        const genre = await Profession.update({ name: name }, { where: { id: id } });

        return res.json(genre)
    }
    async delete(req,res){
        const {id}= req.params
        const genre = await Profession.destroy({ where: { id: id } });
        return res.json(genre)
    }


}

module.exports = new ProfessionController()