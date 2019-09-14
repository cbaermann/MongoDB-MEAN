const task = require('./models');

module.exports = {
    allTasks: function(req, res){
        console.log("all tasks route");
        task.find()
            .then(data => res.json({task : data }))
            .catch(err => res.json(err))
    },
    oneTask: function(req, res){
        task.findOne({_id: req.params.id})
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },
    createTask: function(req, res){
        task.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },
    updateTask: function(req, res){
        console.log("update tasks route");
        console.log(req.params.id);
        console.log(req.body);
        
        task.updateOne({_id: req.params.id}, req.body)
            // .then(task.save())
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },
    deleteTask: function(req, res){
        task.remove({_id: req.params.id})
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },
}