import * as express from "express";
require('express-async-errors');
import * as methodOverride from "method-override";
import {engine} from "express-handlebars";
import {handleError, pageNotFound} from "./utils/errors";
import {homeRouter} from "./routers/home";
import {childRouter} from "./routers/child";
import {giftRouter} from "./routers/gift";
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import "./utils/db";

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);
app.use(pageNotFound);

const port = process.env.PORT || 3000;

// @ts-ignore
app.listen(port, '0.0.0.0', () => {
    // console.log('Listening on http://localhost:3000');
    console.log(`Listening on ${port}`);

})
