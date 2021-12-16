const {Type} = require('../models/models')
const {Composition} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async creat(req,res,next){
        try {
            const {name} =req.body
            const type = await  Type.create({name})
            return res.json(type)
        }
        catch (e) {
            next(ApiError.badRequest((e.message)))

        }

    }
    async getAll(req,res){
        const type = await Type.findAll()
        return res.json(type)
    }
    async getOne(req,res){
        const {name}= req.params
        const add_name = name
        const all_Type = await Type.findAll()
        for (const el_all_Type of all_Type)
        {
            const {name} = el_all_Type
            if(add_name.toLowerCase() == name.toLowerCase())
            {
                return res.json(el_all_Type)
            }
        }
        return res.json(null)
    }
    async update(req,res){
        const {id, name} = req.body
        const genre = await Type.update({ name: name }, { where: { id: id } });

        return res.json(genre)
    }

    async delete(req,res){
        const {id}= req.params
        const genre = await Type.destroy({ where: { id: id } });
        return res.json(genre)
    }

    async getCompositionType(req,res, next){
        const {id}= req.params
        const {typeId} = await Composition.findOne({where:{id: id}})
        const one_type = await Type.findOne({where:{id: typeId}})
        return res.json(one_type)
    }
}

module.exports = new TypeController()