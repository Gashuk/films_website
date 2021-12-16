const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Composition} = require("../models/models");

class RatingController {
    async creatRating(req,res,next){
        try {
            const {rate, userId, compositionId} =req.body
            const rating = await  Rating.create({rate, userId, compositionId})

            return res.json(rating)
        }
        catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
    async getAll(req,res){
        const rating = await Rating.findAll()
        return res.json(rating)
    }
    async getOneRating(req,res,next){
        const {compositionId,userId}= req.params
        const rating = await Rating.findOne({where:{compositionId:compositionId, userId: userId}})

        return res.json(rating)
    }
    async updateRating(req,res){
        const {id, rate} =req.body
        const rating = await Rating.update({ rate: rate}, { where: { id: id } });

        return res.json(rating)
    }

    async deleteRating(req,res){
        const {id}= req.params
        const rating = await Rating.destroy({ where: { id: id } });

        return res.json(rating)
    }
    async getUserRating(req, res, next){
        const {userId}= req.params
        const all_rating = await Rating.findAll({where:{ userId: userId}})
        const new_rating= []
        for (const el_all_rating of all_rating)
        {
            const {id,rate,createdAt,updatedAt,compositionId,userId} = el_all_rating
            const one_composition = await Composition.findOne({where:{id: compositionId}})
            const new_one_rating = {
                "id": id,
                "createdAt": createdAt,
                "updatedAt": updatedAt,
                "compositionId": compositionId,
                "name_composition": one_composition.name,
                "year1": one_composition.year1,
                "img_composition":  one_composition.img,
                "userId": userId,
                "rate": rate
            }
            new_rating.push(new_one_rating)
        }
        return res.json(new_rating)

    }




}

module.exports = new RatingController()