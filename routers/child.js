const  {Router} = require('express');
const {ChildRecord} = require("../records/child.record");
const {GiftRecord} = require("../records/gift.record");

const childRouter = Router();

childRouter
    .get('/', (req, res) => {
        const childList = ChildRecord.listAll();
        const giftList = GiftRecord.listAll();

        res.render('child/list', {
            childList,
            giftList,
        });
    })

module.exports = {
    childRouter,
}