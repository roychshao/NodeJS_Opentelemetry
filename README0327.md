# OpenTelemetry Context Propagation
---
### 更新:
> **index.js中OpenTelemetry設定部份移動至tracing.js**  
> **tracing.js中增加ContextManager來處理上下文關係**  
> *AsyncHooksContextManager: 被不建議使用但官網使用作為範例,用來管理異步上下文*
```javascript
const { AsyncHooksContextManager } = require('@opentelemetry/context-async-hooks');

// OpenTelemetry contextManager
const contextManager = new AsyncHooksContextManager();
contextManager.enable();
api.context.setGlobalContextManager(contextManager);
```
<br/>

> **增加validate middleware讓trace關係增加一層**
```javascript
const validate = async (req, res, next) => {
    
    const parentSpan = req?.span;

    const ctx = api.trace.setSpan(api.context.active(), parentSpan);
    const span = tracer.startSpan('middleware: validate', undefined, ctx);
    req.span = span;    

    setTimeout(() => {
        span.end();
        next();
    }, 50)
}
```
<br/>

---

### context實做
* 在request層:
> **使用startSpan創建一個span,並將span寫到req.span中讓它傳遞到下層  
> 設定res.on finish時關閉span**
```javascript
// tracer middleware
app.use((req, res, next) => {
    const span = tracer.startSpan(`request ${req.method} ${req.path}`);
    span.setAttributes({
        "http.method": req.method,
        "http.url": req.url,
    });
    req.span = span;
    res.on("finish", () => {
        // console.log(span);
        span.setAttribute("http.status_code", res.statusCode);
        span.end();
    });
    next();
});
```

* 在middleware層:
> **將request層傳來的span設為parentSpan  
> 將parentSpan寫入當前context  
> 使用帶有parentSpan的當前context創建新的span, 並在要進入controller前關閉**
```javascript
const validate = async (req, res, next) => {
    
    const parentSpan = req?.span;

    const ctx = api.trace.setSpan(api.context.active(), parentSpan);
    const span = tracer.startSpan('middleware: validate', undefined, ctx);

    setTimeout(() => {
        span.end();
        next();
    }, 50)
}
```

* 在controller層:
> **將request層傳來的span設為parentSpan  
> 將parentSpan寫入當前context  
> 使用帶有parentSpan的當前context創建新的span  
> 將controller層的span傳入model層  
> 在要離開controller前關閉**
```javascript
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
```

* 在model層:
> **將controller層傳來的span設為parentSpan  
> 將parentSpan寫入當前context  
> 使用帶有parentSpan的當前context創建新的span  
> 在資料回傳前關閉**  
```javascript
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
```
