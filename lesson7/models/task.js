const db = require('./db.js');
const config = require('../config');

class Task {

    static async getTasks() {
        const tasks = await db.query('SELECT * FROM tasks');
        return tasks;
    }

    static async createTask(task) {
        const newTask = await db.query('INSERT INTO tasks(description, completed) VALUES (?, ?)', [task.description, task.completed=="true"?1:0]);
        return newTask;
    }

    static async updateTask(taskId, task) {
        const res = await db.query('UPDATE tasks SET description = ? WHERE id = ?', [task.description, taskId]);
        return res;
    }

    static async completeTask(taskId, task) {
        const res = await db.query('UPDATE tasks SET completed = ? WHERE id = ?', [task.completed=="true"?1:0, taskId]);
        return res;
    }

    static async deleteTask(taskId) {
        const res = await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
        return res;
    }

}

module.exports = Task;
