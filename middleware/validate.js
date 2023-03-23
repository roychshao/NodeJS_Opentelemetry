const { tracer, api } = require('./../tracing.js');

const validate = async (req, res, next) => {
    
    const parentSpan = req?.span;

    const ctx = api.trace.setSpan(api.context.active(), parentSpan);
    const span = tracer.startSpan('middleware: validate', undefined, ctx);

    setTimeout(() => {
        span.end();
        next();
    }, 50)
}

module.exports = {
    validate,
}
