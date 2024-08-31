// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const {
    validateProjectId,
    validateProject,
   
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

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
        const {id} = req.params
        const updatedProject = await Projects.update(id, req.body)     
        res.status(201).json(updatedProject)  
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