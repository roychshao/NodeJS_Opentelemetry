const express = require("express");
const dotenv = require('dotenv').config({ path: require('find-config')('.env') });
const cors = require('cors');
const bodyParser = require('body-parser');
const { tracer, api } = require('./tracing'); 

// 創建一個 Express 應用程式
const app = express();

const port = process.env.PORT || 8080;


// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

// express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static('./view/dist'));

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

// root router
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// router-api
const apiRouter = require('./routes/api.js');
app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
