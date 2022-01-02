const  {Router} = require('express');
const {GiftRecord} = require("../records/gift.record");

const giftRouter = Router();

giftRouter
    .get('/', (req, res) => {
        const giftLists = GiftRecord.listAll();
        res.render('gift/list', {
            giftLists,
        });
    })

module.exports = {
    giftRouter,
}