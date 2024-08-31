// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const {
    validateActionId,
    validateActionBody,
} = require('./actions-middlware')

const router = express.Router()

//endpoints

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateActionId, async (req, res, next) => {
    try {
        const {id} = req.body
        await Actions.get(id)
        res.status(200).json(req.action)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateActionBody, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateActionBody, async (req, res, next) => {
    try {
        const {id} = req.params
        const updated = await Actions.update(id, req.body)
        res.status(201).json(updated)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        const {id} = req.params
        await Actions.remove(id)
        res.status(200).json('Action successfully deleted')
    } catch (err) {
        next(err)
    }
})



// error handler middleware

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router