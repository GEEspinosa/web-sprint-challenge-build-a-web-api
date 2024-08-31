// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId (req, res, next) {
    const action = await Actions.get(req.params.id)
    if (!action) {
        res.status(404).json({
            message: 'There are no projects by that id'
        }) 
    } else {
        req.action = action
        next()
    }
}

async function validateActionBody (req, res, next) {  
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        res.status(400).json({
            message: 'Action requires notes, description, and project id'
        })
    } else {
        next()
    }
}

module.exports = {
    validateActionId,
    validateActionBody,
}