const express = require('express');
const app = express();
const siteport = 4444;
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');


var authRoute = require('./middleware/auth');
var orderRoute = require('./routes/orderapi');
var usersRoute = require('./routes/userapi');
var loginRoute = require('./routes/login');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

router.use((req, res, next) => {
    console.log('middleware running');
    next();
})

app.use('/api/orders', authRoute, orderRoute);
app.use('/api/users', usersRoute);
app.use('/api/login', loginRoute);


app.listen(siteport, ()=>{
    console.log(`app running at ${siteport}`);
});