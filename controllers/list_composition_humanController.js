const {List_composition_human} = require('../models/models')
const {Composition} = require('../models/models')
const {List_profession_human} = require('../models/models')
const {Profession} = require('../models/models')
const {Human} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class List_composition_humanController {
    async creat(req,res, next){
        try{
            const {listProfessionHumanId, compositionId} = req.body

            const list_composition_human = await List_composition_human.create({listProfessionHumanId, compositionId})


            return res.json(list_composition_human)
        }
        catch (e){
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAll(req,res){
        const all_List_composition_human = await List_composition_human.findAll()
        // return res.json(all_List_composition_human)
        const new_List_composition_human = []
        for (const el_all_List_composition_human of all_List_composition_human)
        {
            const {id,listProfessionHumanId,compositionId,createdAt,updatedAt} = el_all_List_composition_human
            const one_composition = await Composition.findOne({where:{id: compositionId}})
            const all_List_profession_human = await List_profession_human.findOne({where:{id: listProfessionHumanId}})
            const one_profession = await Profession.findOne({where:{id: all_List_profession_human.professionId}})
            const one_human = await Human.findOne({where:{id: all_List_profession_human.humanId}})
            const new_one_List_composition_human = {
                "id": id,
                "createdAt": createdAt,
                "updatedAt": updatedAt,
                "compositionId": compositionId,
                "name_composition": one_composition.name,
                "img_composition":  one_composition.img,
                "listProfessionHumanId": listProfessionHumanId,
                "humanId": all_List_profession_human.humanId,
                "name_human":one_human.fio,
                "img_human":one_human.img,
                "professionId": all_List_profession_human.professionId,
                "name_profession": one_profession.name

            }
            // return res.json(new_one_List_composition_human)
            new_List_composition_human.push(new_one_List_composition_human)
        }
        return res.json(new_List_composition_human)
    }
    async update(req,res){

        const {id, listProfessionHumanId, compositionId} = req.body
        const list_composition_human = await List_composition_human.update({ listProfessionHumanId: listProfessionHumanId,  compositionId: compositionId}, { where: { id: id } });

        return res.json(list_composition_human)
    }
    async getOne(req,res){

    }
    async delete(req,res){
        const {id}= req.params
        const list_composition_human = await List_composition_human.destroy({ where: { id: id } });
        return res.json(list_composition_human)
    }


    async getOneList_composition_human(req,res,next){
        const {compositionId,list_profession_humanId}= req.params
        const list_composition_human = await List_composition_human.findOne({where:{compositionId:compositionId, listProfessionHumanId: list_profession_humanId}})

        return res.json(list_composition_human)
    }
}

module.exports = new List_composition_humanController()