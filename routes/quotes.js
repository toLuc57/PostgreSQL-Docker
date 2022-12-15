var express = require('express');
var router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await quotes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

/* POST quotes */
router.post('/', async function(req, res, next) {
  try {
    res.json(await quotes.create(req.body));
  } catch (err) {
    console.error(`Error while posting quotes `, err.message);
    next(err);
  }
});

/*PUT quotes */
router.put('/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    res.json(await quotes.update(id, data));
  } catch(err) {
    console.error(`Error while putting quotes `, err.message);
    next(err);
  }

});

router.delete('/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    res.json(await quotes.deletebyid(id));
  } catch(err) {
    console.error(`Error while deleting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
