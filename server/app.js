/** @format */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');



dotenv.config({ path: './config.env' });

require('./db/conn');

app.use(express.json());
app.use(cookieParser());

//linked the router file
app.use(require('./router/auth'));

const PORT = process.env.PORT;

//Middleware
// const mildleware = (req, res, next) => {
// 	console.log('Milddleware');
// 	next();
// };

app.get('/', (req, res) => {
	res.send('Hello World');
});

// app.get('/about', (req, res) => {
// 	res.send('About');
// });

// app.get('/contact', (req, res) => {
// 	res.send('Contact');
// });

const path = require('path')
if(process.env.NODE_ENV=='production'){
    

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname, '..','client','build')));
        res.sendFile(path.resolve(__dirname, '..','client','build','index.html'));
    })
}

// console.log(path.resolve(__dirname, '..','client','build','index.html'));


app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});

// , {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }
