const express = require('express')
const router = express.Router()
const data = require('../dummyData.json')
const moment = require('moment'); // require
const Expense = require('../model/Expense')

// Created an expense for each item in the dummyData.json file once.

// data.forEach(function (item) {
//     const expense = new Expense(item)
//     expense.save()
// })

router.get('/expenses', function (req, res) {
    const {d1, d2} = req.query
    if (d1 && d2) {
        Expense.find({date: {$gte: d1, $lte: d2}}).then(function (expenses) {
            res.send(expenses)
        })
    } else if (d1) {
        Expense.find({date: {$gte: d1}}).then(function (expenses) {
            res.send(expenses)
        })
    } else {
        Expense.find({}).then(function (expenses) {
            res.send(expenses)
        })
    }
})

router.post('/expense', function (req, res) {
    const {item, amount, group, date} = req.body
    const newDate = date ? moment(date).format("LLLL") : moment().format("LLLL")
    Expense.create({item, amount, group, date: newDate}).then(function (expense) {
        res.send(expense)
    })
})


router.put('/update', function (req, res) {
    const {group1, group2} = req.body
    Expense.findOneAndUpdate({group: group1}, {group: group2}).then(function () {
        Expense.findOne({group: group2}).then(function (expense) {
            res.send(expense)
        })
    })
})

router.get('/expenses/:group', function (req, res) {
    const {group} = req.params
    const {total} = req.query
    if (total) {
        Expense.aggregate([
            {$match: {group: group}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]).then(function (expenses) {
            res.send(expenses)
        })
    } else {
        Expense.find({group: group}).then(function (expenses) {
            res.send(expenses)
        })
    }
})
module.exports = router
