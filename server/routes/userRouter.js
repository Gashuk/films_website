const  Routes = require('express')
const router = new Routes()
const userController = require('../controllers/userController')
const compositionController = require('../controllers/compositionController')
const ratingController = require('../controllers/ratingController')
const reviewController = require('../controllers/reviewController')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.get('/:id', userController.getOne)
router.get('/user_profile/:id', userController.getOne)
router.put('/user_profile', userController.update)

router.get('/oneComposition/:id',compositionController.getOneComposition)

router.get('/rating/:compositionId/:userId',ratingController.getOneRating)
router.get('/user_rating/:userId', ratingController.getUserRating)
router.post('/creatRating', ratingController.creatRating)
router.put('/updateRating', ratingController.updateRating)
router.delete('/deleteRating/:id', ratingController.deleteRating)

router.get('/review/:compositionId/:userId',reviewController.getOneReview)
router.get('/user_review/:userId', reviewController.getUserReview)
router.post('/creatReview', reviewController.creatReview)
router.put('/updateReview', reviewController.updateReview)
router.delete('/deleteReview/:id', reviewController.deleteReview)
// router.get('/login/:id', userController.getOne)
// router.get('/registration/:id', userController.getOne)



module.exports = router