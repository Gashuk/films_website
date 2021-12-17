const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Composition} = require("../models/models");
const {User} = require("../models/models");
const {Review} = require("../models/models");

class ReviewController {
    async creatReview(req,res,next){
        // return res.json("rating")
        try {
            const {title, text, userId, compositionId} =req.body
            const review = await  Review.create({title, text, userId, compositionId})
            return res.json(review)
        }
        catch (e) {
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAll(req,res){
        const review = await Review.findAll()
        return res.json(review)
    }

    async updateReview(req,res){

        const {id, title, text} =req.body
        const review = await Review.update({ title: title, text: text}, { where: { id: id } });
        return res.json(review)
    }
    async deleteReview(req,res){
        const {id}= req.params
        const review = await Review.destroy({ where: { id: id } });
        return res.json(review)
    }
    async getOneReview(req,res,next){
        const {compositionId,userId}= req.params
        const review = await Review.findOne({where:{compositionId:compositionId, userId: userId}})

        return res.json(review)

    }
    async getAllCompositionReview(req, res, next){

        const {id}= req.params
        const all_Review = await Review.findAll({where:{compositionId: id}})
        const new_Review = []

        for (const el_all_Review of all_Review)
        {
            const {id, title, text, userId, compositionId,updatedAt,createdAt} = el_all_Review
            const one_user = await User.findOne({where:{id: userId}})
            const new_one_Review = {
                "id": id,
                "createdAt": createdAt,
                "updatedAt": updatedAt,
                "title": title,
                "text":text,
                "userId": userId,
                "fio_user":one_user.fio,
                "img_user":one_user.img,
                "compositionId": compositionId

            }
            new_Review.push(new_one_Review)
        }
        return res.json(new_Review)
    }
    async getUserReview(req, res, next){
        const {userId}= req.params
        const all_review = await Review.findAll({where:{ userId: userId}})
        const new_review= []
        for (const el_all_review of all_review)
        {
            const {id, title, text,createdAt,updatedAt,compositionId,userId} = el_all_review
            const one_composition = await Composition.findOne({where:{id: compositionId}})
            const new_one_review = {
                "id": id,
                "createdAt": createdAt,
                "updatedAt": updatedAt,
                "compositionId": compositionId,
                "name_composition": one_composition.name,
                "img_composition":  one_composition.img,
                "userId": userId,
                "title": title,
                "text": text
            }
            new_review.push(new_one_review)
        }
        return res.json(new_review)

    }


}

module.exports = new ReviewController()