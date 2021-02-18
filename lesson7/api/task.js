const models = require('../../models');
const config = require('../../config');

exports.getTasks = (req, res, next) => {
    models.Task.getTasks().then(([rows, fieldData]) => {
        res.json({ tasks: rows });
    })
}

exports.createTask = (req, res, next) => {
    models.Task.createTask(req.body).then(([rows, fieldData]) => {
        res.json({ Status: "Task created", newTaskId: rows.insertId});
    })
}

exports.updateTaskDescription = (req, res, next) => {
    models.Task.updateTask(req.params.taskId, req.body).then(([rows, fieldData]) => {
        res.json({ Status: "Task description updated", affectedTasks: rows.affectedRows, changedTasks: rows.changedRows });
    })
}

exports.completeTask = (req, res, next) => {
    models.Task.completeTask(req.params.taskId, req.body).then(([rows, fieldData]) => {
        res.json({ Status: "Task completion updated", affectedTasks: rows.affectedRows, changedTasks: rows.changedRows });
    })
}

exports.deleteTask = (req, res, next) => {
    models.Task.deleteTask(req.params.taskId).then(([rows, fieldData]) => {
        res.json({ Status: "Task deleted", deletedTasks: rows.affectedRows });
    })
}
