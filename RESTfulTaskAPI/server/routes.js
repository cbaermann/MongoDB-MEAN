const controller = require('./controller')

module.exports = function (app) {
    app.get('/tasks', controller.allTasks)
    app.get('/tasks/:id', controller.oneTask)
    app.post('/tasks', controller.createTask)
    app.put('/tasks/:id', controller.updateTask)
    app.delete('/tasks/:id', controller.deleteTask)
}