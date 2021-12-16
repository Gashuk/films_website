const Routes = require('express')
const router = new Routes()
const RatingController = require('../controllers/RatingController')

router.post('/',RatingController.creatRating)
router.get('/:id',RatingController.getAll)
router.put('/',RatingController.updateRating)
router.delete('/:id',RatingController.deleteRating)

module.exports = router