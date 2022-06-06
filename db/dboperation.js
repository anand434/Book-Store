var config = require('./dbconfig');
var sql = require('mssql');
const { password } = require('./dbconfig');


async function getUsers(){
    try{
        let pool = await sql.connect(config);
        let users = await pool.request().query("select * from Users");
        return users.recordsets;
    }
    catch (err) {
        console.log(err)
    }
}

async function getUser(id){
    try{
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('input_parameter', sql.BigInt, id)
        .query("select * from Users where id = @input_parameter");

        return user.recordsets;
    }
    catch (err) {
        console.log(err)
    }
}

async function getUser(username, password){
    try{
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query("select top 1 id from Users where UserName = @username and Password = @password");

        return user.recordsets;
    }
    catch (err) {
        console.log(err)
    }
}


async function addUser(user){
    try{
        let pool = await sql.connect(config);
        let insertRequest = await pool.request()
        .input('Name', sql.NVarChar, user.Name)
        .input('UserName', sql.NVarChar, user.UserName)
        .input('Password', sql.NVarChar, user.Password)
        .input('Email', sql.NVarChar, user.Email)
        .input('Phone', sql.NVarChar, user.Phone)
        .execute('InsertUser');

        return insertRequest.recordsets;
    }
    catch (err) {
        console.log(err)
    }
}



async function getOrders(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("select * from Orders");
        return products.recordsets;
    }
    catch (err) {
        console.log(err);
    }   
}

async function getOrder(id) {
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_parameter', sql.BigInt, id)
        .query("select * from Orders where id = @input_parameter");

        return product.recordsets;
    }
    catch(err){
        console.log(err);
    }
}

async function addOrder(order) {
    try{
        let pool = await sql.connect(config);
        let insertRequest = await pool.request()
        .input('Title', sql.NVarChar, order.Title)
        .input('Quantity', sql.NVarChar, order.Quantity)
        .input('Msg', sql.NVarChar, order.Msg)
        .input('City', sql.NVarChar, order.City)
        .execute('InsertOrder');

        return insertRequest.recordsets;
    }
    catch(err){
        console.log(err);
    }
}


module.exports = { getOrder, getOrders, addOrder, getUser, getUsers, addUser }
