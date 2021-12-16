const Routes = require('express')
const router = new Routes()
const GenreController = require('../controllers/GenreController')
const List_genreController = require('../controllers/List_genreController')

router.post('/',GenreController.creat)
router.get('/',GenreController.getAll)
router.get('/:name',GenreController.getOne)
router.put('/',GenreController.update)
router.delete('/:id',GenreController.delete)
router.get('/mraz',List_genreController.getOneList_genre)

module.exports = router