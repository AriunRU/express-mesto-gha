const router = require('express').Router();

const routerUsers = require('./users');
const routerCards = require('./cards');
const { NOT_FOUND_404 } = require('../utils/utils');
const { login, createUsers } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateRegister } = require('../utils/validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUsers);

router.use(auth);
router.use('/users', routerUsers);
router.use('/cards', routerCards);

router.use((req, res) => {
  res.status(NOT_FOUND_404).send({ message: 'Такой страницы не существует.' });
});

module.exports = router;
