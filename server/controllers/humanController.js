const {Human} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const {List_profession_human} = require("../models/models");
const {Profession} = require("../models/models");
const {List_composition_human} = require("../models/models");

class HumanController {
    async creat(req,res, next){
        try{
            const { fio, defaultImg} =req.body
            try
            {
                const {img} = req.files

                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))

                const human = await  Human.create({fio, img: fileName})

                return res.json(human)
            }
            catch (e)
            {
                    const human = await Human.create({ fio: fio, img: defaultImg });
                    return res.json(human)
            }

        }
        catch (e){
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAll(req,res){
        const human = await Human.findAll()
        return res.json(human)
    }
    async update(req,res,next){


        try{

            const {id, fio, defaultImg, boolUpdateImg} =req.body
            try {

                const {img} = req.files

                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))

                const human = await Human.update({ fio: fio , img: fileName}, { where: { id: id } });
                return res.json(human)

            }
            catch (e){
                if (boolUpdateImg == "true")
                {
                    const human = await Human.update({ fio: fio, img: defaultImg }, { where: { id: id } });
                    return res.json(human)
                }
                else
                {
                    const human = await Human.update({ fio: fio}, { where: { id: id } });
                    return res.json(human)
                }
            }

        }
        catch (e){
            next(ApiError.badRequest((e.message)))
        }

    }

    async delete(req,res){
        const {id}= req.params
        const genre = await Human.destroy({ where: { id: id } });
        return res.json(genre)
    }
    async getOne(req,res){
        const {id}= req.params
        const genre = await Human.findOne({ where: { id: id } })
        return res.json(genre)
    }
    async getCompositionHuman(req,res, next){
        const {id}= req.params
        const profession_human = []
        const all_List_composition_human = await List_composition_human.findAll({where:{compositionId: id}})
        const all_Profession_count = await Profession.findAndCountAll()
        const {count} = all_Profession_count
        for (let i = 1; i < (count + 1) ; i++)
        {
            const el_profession_human = []
            for (const el_all_List_composition_human of all_List_composition_human)
            {
                const {listProfessionHumanId} = el_all_List_composition_human
                const all_List_profession_human = await List_profession_human.findAll({where: {id: listProfessionHumanId}})
                for (const el_all_List_profession_human of all_List_profession_human)
                {
                    const {humanId, professionId} = el_all_List_profession_human
                    if (professionId == i) {
                        const all_Human = await Human.findAll({where: {id: humanId}})
                        for (const el_all_Human in all_Human) {
                            el_profession_human.push(all_Human[el_all_Human])
                        }
                    }
                }
            }
            // return res.json(el_profession_human)
            profession_human.push(el_profession_human)
        }
        return res.json(profession_human)
    }
}

module.exports = new HumanController()