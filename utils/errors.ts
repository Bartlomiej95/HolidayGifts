import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {

    console.error(err);
    console.log(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error/error', {
            message: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za kilka minut.'
        })
}

export const pageNotFound = (req: Request, res: Response, next: NextFunction) => {
    const err = new ValidationError('404 page not found') as any;
    err.status = 404;
    res.render( 'error/error404');
}