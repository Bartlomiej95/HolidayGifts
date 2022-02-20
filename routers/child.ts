import {Router} from 'express';
import {ValidationError} from "../utils/errors";
import {ChildRecord} from "../records/child.record";
import {GiftRecord} from "../records/gift.record";
import {GradebookRecord} from "../records/gradebook.record";

export const childRouter = Router();

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
    })

    .get('/gradebook', async (req, res) => {
        const gradebook = await GradebookRecord.listAll();
        const childList = await ChildRecord.listAll();

        res.render('gradebook/list', {
            marksList: gradebook,
            childList,
        });
    })