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

// async function validateProjectPut (req, res, next) {
//     console.log('firing validateProjectPut middleware')
//     let {completed} = req.body 

//     if (!completed){
//         console.log('no completed status')
//         res.status(400).json({
//             message: 'Project requires name, description, and completed status'
//         })
//     }
    
//     else {
//         console.log('we have completed status')
//         res.updated = req.body
//         next()
//     }
// }



module.exports = {
    validateProjectId,
    validateProject,  
}