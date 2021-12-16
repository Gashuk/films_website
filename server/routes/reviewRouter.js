const Routes = require('express')
const router = new Routes()
const ReviewController = require('../controllers/ReviewController')

router.post('/',ReviewController.creatReview)
router.get('/:id',ReviewController.getAll)
router.put('/',ReviewController.updateReview)
router.delete('/:id',ReviewController.deleteReview)
module.exports = router