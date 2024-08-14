const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    age: Number,
    gender: String,
    salary: Number,
    retireage: Number,
    childrens: Number,
    childexpense: Number,
    parents: String,
    parexpenses: Number,
    emergencyexpenses: Number,
    loan: String,
    loanamount: Number,
    loaninterest: Number,
    expenditure: Number,
    amountToInvest: Number
});

module.exports = investmentSchema;
