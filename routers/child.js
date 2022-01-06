const {ValidationError} = require("../utils/errors");
const  {Router} = require('express');
const {ChildRecord} = require("../records/child.record");
const {GiftRecord} = require("../records/gift.record");

const childRouter = Router();

childRouter
    .get('/', async (req, res) => {
        const childList = await ChildRecord.listAll();
        const giftList = await GiftRecord.listAll();

        res.render('child/list', {
            childList,
            giftList,
        });
    })

    .post('/', async (req, res) => {

        const newChild = new ChildRecord(req.body);
        await newChild.insert();

        res.redirect('/child');
    })

    .patch('/gift/:childId', async (req, res) => {
        const child = await ChildRecord.getOne(req.params.childId);
        console.log(child);

        if(child === null) {
            throw new ValidationError('Not found child with given ID')
        }

        const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId);
        // gift - sprawdzamy i pobieramy prezent który jest ewentualnie przypisany do dziecko po childId - patrz parametr
        console.log(gift);
        if(gift){
            if(gift.count <= await gift.countGivenGifts()){
                throw new ValidationError('This gift is gone');
            }
        }

        child.giftId = gift === null ? null : gift.id;
        await child.update();
        res.redirect('/child');
    });

module.exports = {
    childRouter,
}