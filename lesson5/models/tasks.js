const mysql2 = require('mysql2');

const Tasks = {
    list: (pool, cb) => {
        pool.getConnection((err, con) => {
            if (err) {
                console.log(err);
            } else {
                con.query('select * from tasks', (err, res) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(res);
                    }
                });
                con.release();
            }
        });
    },

    add: function(pool, task, cb) {
        let sql = mysql2.format('insert tasks(description, date_begin) values(?, ?)', [task.desc, task.date]);
        pool.getConnection((err, con) => {
            if (err) {
                cb(err);
            } else {
                con.query(sql, (err, res) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(res);
                    }
                });
                con.release();
            }
        });
    },

    change: function(pool, task, cb) {
        let sql = mysql2.format('update tasks set (description = ?, date_begin = ?) where id = ?)', [task.desc, task.date, task.id]);
        pool.getConnection((err, con) => {
            if (err) {
                cb(err);
            } else {
                con.query(sql, (err, res) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(res);
                    }
                });
                con.release();
            }
        });
    },

    complete: (pool, id, cb) => {
        let sql = mysql2.format('select * from tasks where ?? = ?', ['id', id]);
        pool.getConnection((err, con) => {
            if (err) {
                cb(err);
            } else {
                con.query(sql, (err, res) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(res);
                    }
                });
                con.release();
            }
        });
    },

    delete: function(pool, id, cb) {
        let sql = mysql2.format('delete from tasks where ?? = ?', ['id', id]);
        pool.getConnection((err, con) => {
            if (err) {
                cb(err);
            } else {
                con.query(sql, (err, res) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(res);
                    }
                });
                con.release();
            }
        });
    }
};

module.exports = Tasks;