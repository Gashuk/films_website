const Routes = require('express')
const router = new Routes()
const List_genreController = require('../controllers/list_genreController')

router.post('/',List_genreController.creat)
router.get('/',List_genreController.getAll)
router.get('/:id',List_genreController.getOne)
router.put('/',List_genreController.update)
router.delete('/:id',List_genreController.delete)
router.get('/compositionId_genreId',List_genreController.getOneList_genre)

module.exports = router