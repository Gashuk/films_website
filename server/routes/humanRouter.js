const Routes = require('express')
const router = new Routes()
const humanController = require('../controllers/humanController')

router.post('/',humanController.creat)
router.get('/',humanController.getAll)
router.get('/:id',humanController.getOne)
router.put('/',humanController.update)
router.delete('/:id',humanController.delete)

module.exports = router