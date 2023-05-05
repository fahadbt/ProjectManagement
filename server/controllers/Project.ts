import { Request, Response } from 'express'
import Project from '../database/Schemas/Project'

//Get the Projects Data from Database
async function getAllProjects(req: Request, res: Response) {
    try {
        const userId = req.body.userId
        const projects = await Project.find({ Owner: userId })
        res.json(projects);
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

//Create new Project
function createProject(req: Request, res: Response) {
    const projectsData = req.body.finalProject
    const newProject = new Project(projectsData)
    newProject.save()
        .then(() => res.status(200).send('Project Created successfully'))
        .catch((err: Error) => {
            console.log(err);
            res.status(400).send(err.message)
        });
}

//Delete Project
async function deleteProject(req: Request, res: Response) {
    const projectId = req.body.projectId;

    try {
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (!deletedProject) {
            res.status(404).json({ error: `Project with ID ${projectId} not found` });
            return;
        }
        res.json({ message: `Project with ID ${projectId} deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    getAllProjects,
    createProject,
    deleteProject
}


//Later
// app.get('/api/getPassword/:user', async (req, res) => {
//     const userName = req.params.user;

//     try {
//         const user = await User.findOne({ userName: userName });
//         if (!user) {
//             res.status(404).json({ error: `User ${userName} not found` })
//             return;
//         }
//         const password = user.userPassword
//         res.json({ password })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })