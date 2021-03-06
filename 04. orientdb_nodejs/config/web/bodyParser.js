module.exports = (app)=>{
    const bodyParser = require('body-parser');
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    app.set('views', './views');
    app.set('view engine', 'pug');
}

