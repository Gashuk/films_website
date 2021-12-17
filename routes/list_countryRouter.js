const Routes = require('express')
const router = new Routes()
const List_countryController = require('../controllers/list_countryController')

router.post('/',List_countryController.creat)
router.get('/',List_countryController.getAll)
router.get('/:id',List_countryController.getOne)
router.put('/',List_countryController.update)
router.delete('/:id',List_countryController.delete)
router.get('/:compositionId/:countryId',List_countryController.getOneList_country)

module.exports = router