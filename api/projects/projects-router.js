// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const {
    validateProjectId,
    validateProject,
    validateProjectPut
   
} = require('./projects-middleware')


const router = express.Router()


//endpoints

router.get('/', async (req, res, next) => {
    try {
        const projects =  await Projects.get()
        res.status(200).json(projects)
    } catch (err){
        next(err)
    }  
})

router.get('/:id', validateProjectId, (req, res, next) => {
    try {
        res.status(200).json(req.project)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateProjectId, validateProject, validateProjectPut, async (req, res, next) => {
    try {
       res.status(201).json(req.updatedProject)
    } catch (err) {
        next(err)
    }       
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.status(200).json({
            message: 'Project successfully deleted'
        })
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

//error handling middleware

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

//exposing router

module.exports = router