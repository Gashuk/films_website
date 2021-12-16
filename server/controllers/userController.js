const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const {Rating} = require('../models/models')
const {Review} = require('../models/models')
const {Composition} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

const generateJwt = (id, fio, email, img, role) =>{
    return jwt.sign(
        {id, fio, email, img, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}




class UserController {
    async registration(req,res, next){
        const {email, password, role, img} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некорректный email или password!!!'))
        }
        const  candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует!!!'))

        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email, role, password: hashPassword, img :img})
        const token = generateJwt(user.id, user.fio, user.email, user.img, user.role)
        return res.json({token})
    }


    async login(req,res,next){
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден!!'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internal('Введен неверный пароль!!'))
        }
        const token = generateJwt(user.id, user.fio, user.email, user.img, user.role)
        return res.json({token})
    }

    async check(req,res,next){
        // const  token = generateJwt(req.user.id, req.user.email, req.user.role)
        const token = generateJwt(req.user.id, req.user.fio, req.user.email, req.user.img, req.user.role)

        return res.json({token})
    }


    async getOne(req,res,next){
        const {id}= req.params
        const user = await User.findOne({where:{id: id}})
        return res.json(user)

    }

    async update(req,res){

        const {id, fio, email, defaultImg, boolUpdateImg} =req.body
        try
        {
            const {img} = req.files

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))


            const rating = await User.update({ fio: fio, email: email, img: fileName }, { where: { id: id } });

            return res.json(rating)
        }
        catch (e)
        {
            if (boolUpdateImg == "true")
            {
                const rating = await User.update({ fio: fio, email: email, img: defaultImg }, { where: { id: id } });
                return res.json(rating)
            }
            else
            {
                const rating = await User.update({ fio: fio, email: email}, { where: { id: id } });
                return res.json(rating)
            }
        }
    }



}


module.exports = new UserController()