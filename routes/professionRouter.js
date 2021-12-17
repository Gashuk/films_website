const Routes = require('express')
const router = new Routes()
const professionController = require('../controllers/professionController')

router.post('/',professionController.creat)
router.get('/',professionController.getAllProfession)
router.get('/:name',professionController.getOne)
router.put('/',professionController.update)
router.delete('/:id',professionController.delete)

module.exports = router