'use strict'

let Project = require('../models/project');
let fs = require('fs');
let path = require('path');

let controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy el home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Soy el metodo test',
            content: req.body
        });
    },

    saveProject: function(req, res){
        let project = new Project();
        let params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        project.save((error, projectStored)=> {
            if(error){
                return res.status(500).send({
                    message: 'Error al guardar el documento'
                });
            }

            if(!projectStored){
                return res.status(404).send({
                    message: 'No se ha podido guardar el proyecto, ERROR 404'
                });
            }

            return res.status(200).send({
                project: projectStored
            });
        });
    },

    getProject: function(req, res){
       let projectId = req.params.id;

       if(projectId == null){
            return res.status(404).send({
                message: 'No se ha encontrado el documento'
            });
        }

        Project.findById(projectId, (error, project)=>{
            if(error){
                return res.status(500).send({
                    message: 'Error al obtener los datos'
                });
            }

            if(!project){
                return res.status(404).send({
                    message: 'No se ha encontrado el documento'
                });
            }

            return res.status(200).send({
                project: project
            });
        });
    },
    getProjects: function(req, res){
        // Project.find().sort('year').exec((error, projects)=> {
        Project.find((error, projects)=> {
            if(error){
                return res.status(500).send({
                    message: 'Error al obtener los datos'
                });
            }

            if(!projects){
                return res.status(404).send({
                    message: 'No se han encontrado los documentos'
                });
            }

            return res.status(200).send({
                projects
            });
        });
    },
    updateProject: function(req, res){
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (error, projectUpdated)=> {
            if(error){
                return res.status(500).send({
                    message: 'Error al actualizar los datos'
                });
            }

            if(!projectUpdated){
                return res.status(404).send({
                    message: 'No se ha encontrado el documento'
                });
            }

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },
    deleteProject: function(req, res){
        let projectId = req.params.id;
        Project.findByIdAndRemove(projectId, (error, projectDeleted)=> {
            if(error){
                return res.status(500).send({
                    message: 'Error al borrar el documento'
                });
            }

            if(!projectDeleted){
                return res.status(404).send({
                    message: 'No se ha encontrado el documento'
                });
            }

            return res.status(200).send({
                project: projectDeleted
            });
        });
    },
    uploadImage: function(req, res){
        let projectId = req.params.id;
        let fileName = 'Imagen no subida';
        if(req.files){
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            let extSplit = fileName.split('.');
            let fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image:fileName}, {new:true}, (error, projectUpdated)=>{
                    if(error){
                        return res.status(500).send({
                            message: 'No se pudo subir el archivo'
                        });
                    }

                    if(!projectUpdated){
                        return res.status(404).send({
                            message: 'No se encontro el proyecto para subir la imagen'
                        });
                    }

                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            } else {
                fs.unlink(filePath, (error)=> {
                    return res.status(500).send({
                        message: 'La extension no es valida'
                    });
                });
            }

        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },
    getImage: function(req, res){
      let fileName = req.params.file;
      let filePath = `./uploads/${fileName}`;

      //Comprobar que el directorio existe
      fs.exists(filePath, exist=> {
        //Si existe, enviar el archivo
        if(exist){
          // El 'path' es un modulo que se debe importar,
          // El metodo sendFile, tiene 2 parametros, dirname y archivo a servir.
          return res.sendFile(path.resolve(filePath));
        } else {
          return res.status(200).send({
            message: 'No se ha encontrado la imagen'
          })
        }
      })
    }
};

module.exports = controller;
