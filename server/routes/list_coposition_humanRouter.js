const Routes = require('express')
const router = new Routes()
const list_composition_humanController = require('../controllers/list_composition_humanController')

router.post('/',list_composition_humanController.creat)
router.get('/',list_composition_humanController.getAll)
router.get('/:id',list_composition_humanController.getOne)
router.put('/',list_composition_humanController.update)
router.delete('/:id',list_composition_humanController.delete)
router.get('/:compositionId/:list_profession_humanId',list_composition_humanController.getOneList_composition_human)

module.exports = router