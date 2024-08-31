// add middlewares here related to projects
const Projects = require('./projects-model')


async function validateProjectId (req, res, next) {
    console.log('firing validateProjectId middleware')

    const project = await Projects.get(req.params.id)
    if (!project) {
        res.status(404).json({
            message: 'There are no projects by that id'
        }) 
    } else {
        req.project = project
        next()
    }

}

async function validateProject (req, res, next) {
    console.log('firing validateProject middleware')

        if (!req.body.name || !req.body.description) {
            res.status(400).json({
                message: 'Project requires name and description'
            })
        } else {
            next()
        }
}


const bool = (item) => {
    if (typeof item === "boolean"){
        return item
    } 
    if (item === "true") {
        return true
    }
    if (item === "false") {
        return false
    }
} 


async function validateProjectPut (req, res, next) {
    console.log('firing validateProjectPut middleware')
    const {completed} = req.body
    const boolean = bool(completed)

    if (boolean === undefined) {
        res.status(400).json({
            message: 'Project requires name, description, and completed status'
        })
    }
    
    else {
        const {id} = req.params
        const updatedProject = await Projects.update(id, {...req.body, completed: boolean})
        req.updatedProject = updatedProject
        next()
    }
}



module.exports = {
    validateProjectId,
    validateProject, 
    validateProjectPut 
}