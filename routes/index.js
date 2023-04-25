const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

const notFoundRouter = (req, res) => {
  res.status(404).send({ message: '404 - Страница не найдена' });
};

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', notFoundRouter);

module.exports = router;
