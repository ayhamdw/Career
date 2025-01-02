const Project = require("../models/project");

const createProject = async (req, res) => {
  try {
    const { title, content, images, user } = req.body;
    await Project.create({ user, title, content, images })
      .then((project) => {
        res.status(201).send({ message: "Project created successfully" });
      })
      .catch((error) => {
        res.status(400).send({ error: "Project creation failed", error });
      });
  } catch (error) {
    console.log("error while creating project", error);
  }
};

const getMyProjects = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.find({ user: id })
      .then((projects) => {
        res.status(200).send({ projects });
      })
      .catch((error) => {
        res.status(400).send({ error: "Failed to get projects" });
      });
  } catch (error) {
    console.log("error while getting projects", error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id)
      .then((project) => {
        res.status(200).send({ message: "Project deleted successfully" });
      })
      .catch((error) => {
        res.status(400).send({ error: "Failed to delete project" });
      });
  } catch (error) {
    console.log("error while deleting project", error);
  }
};
module.exports = { createProject, getMyProjects, deleteProject };
