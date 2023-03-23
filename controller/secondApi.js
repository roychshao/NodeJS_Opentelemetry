const { tracer, api } = require('./../tracing.js');

const getUserData = async (parentSpan) => {
    return new Promise( async (resolve, reject) => {
        const ctx = api.trace.setSpan(api.context.active(), parentSpan);
        const span = tracer.startSpan('model: getUserData', undefined, ctx);
       
        var response = {
            "success": true,
            "message": "Successfully get user",
            "data": {
                "username": "royshao"
            }
        };

        setTimeout(() => {    
            span.end();
            resolve(response);
        }, 50)
    })
}

const getEmailData = async (parentSpan) => {
    return new Promise( async (resolve, reject) => {
        const ctx = api.trace.setSpan(api.context.active(), parentSpan);
        const span = tracer.startSpan('model: getEmailData', undefined, ctx);
        
        var response = {
            "success": true,
            "message": "Successfully get email",
            "data": {
                "email": "roych.shao@gmail.com"
            }
        };

        setTimeout(() => {    
            span.end();
            resolve(response);
        }, 50)
    })
}

const getPasswordData = async (parentSpan) => {
    return new Promise( async (resolve, reject) => {
        const ctx = api.trace.setSpan(api.context.active(), parentSpan);
        const span = tracer.startSpan('model: getPasswordData', undefined, ctx);
        
        var response = {
            "success": true,
            "message": "Successfully get password",
            "data": {
                "password": "**********"
            }
        };

        setTimeout(() => {    
            span.end();
            resolve(response);
        }, 50)
    })
}

module.exports = {
    getUserData,
    getEmailData,
    getPasswordData
}
