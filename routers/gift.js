const  {Router} = require('express');

const giftRouter = Router();

giftRouter
    .get('/', (req, res) => {
        res.render('gift/list');
    })

module.exports = {
    giftRouter,
}