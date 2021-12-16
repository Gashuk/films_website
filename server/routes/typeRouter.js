const Routes = require('express')
const router = new Routes()
const TypeController = require('../controllers/typeController')

router.post('/',TypeController.creat)
router.get('/',TypeController.getAll)
router.get('/:name',TypeController.getOne)
router.put('/',TypeController.update)
router.delete('/:id',TypeController.delete)

module.exports = router