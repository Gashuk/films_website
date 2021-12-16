const Routes = require('express')
const router = new Routes()
const CountryController = require('../controllers/CountryController')

router.post('/',CountryController.creat)
router.get('/',CountryController.getAll)
router.get('/:name',CountryController.getOne)
router.put('/',CountryController.update)
router.delete('/:id',CountryController.delete)

module.exports = router