const axios = require('axios');
const qs = require('qs');
const { tracer, api } = require('./../tracing.js');
const { getUserData, getEmailData, getPasswordData } = require('./secondApi');

const getUser = async (req, res, next) => {
    try {
        
        const parentSpan = req?.span;
        const ctx = api.trace.setSpan(api.context.active(), parentSpan);
        const span = tracer.startSpan('controller: getUser', undefined, ctx);

        await getUserData(span).then((response) => {
            span.end();
            res.status(201).json(response);
        });
    } catch(err) {
        var response = {
            "success": false,
            "message": err,
            "data": {}
        }
        res.status(400).json(response);
    }
}

const getEmail = async (req, res, next) => {
    try {

        const parentSpan = req?.span;
        const ctx = api.trace.setSpan(api.context.active(), parentSpan);
        const span = tracer.startSpan('controller: getEmail', undefined, ctx);

        await getEmailData(span).then((response) => {
            span.end();
            res.status(201).json(response);
        });
    } catch(err) {
        var response = {
            "success": false,
            "message": err,
            "data": {}
        }
        res.status(400).json(response);
    }
}

const getPassword = async (req, res, next) => {
    try {

        const parentSpan = req?.span;
        const ctx = api.trace.setSpan(api.context.active(), parentSpan);
        const span = tracer.startSpan('controller: getPassword', undefined, ctx);

        await getPasswordData(span).then((response) => {
            span.end();
            res.status(201).json(response);
        });
    } catch(err) {
        var response = {
            "success": false,
            "message": err,
            "data": {}
        }
        res.status(400).json(response);
    }
}

const getWait = async (req, res, next) => {
    try {
        const parentSpan = req?.span;
        const ctx = api.trace.setSpan(api.context.active(), parentSpan);
        const span = tracer.startSpan('controller: getWait', undefined, ctx);

        setTimeout(() => {
            span.end();
            res.redirect('/api/user');
        }, 5000)
    } catch(err) {
        var response = {
            "success": false,
            "message": err,
            "data": {}
        }
        res.status(400).json(response);
    }
}

module.exports = {
    getUser,
    getEmail,
    getPassword,
    getWait
}
