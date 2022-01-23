class ValidationError extends Error {

}

const handleError = (err, req, res, next) => {

    console.error(err);
    console.log(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error/error', {
            message: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za kilka minut.'
        })
}

const pageNotFound = (req, res, next) => {
    const err = new Error('404 page not found');
    err.status = 404;
    res.render( 'error/error404');
}

module.exports = {
    pageNotFound,
    handleError,
    ValidationError
}