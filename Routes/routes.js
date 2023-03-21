let router = require('express').Router();

router.get('/',function(req,res){
    res.json({
        status : 'API Works',
        message : "Welcome to AGM/EGMs"
    })
});

const users = require('../Model/Models');
const countermodel =require('../Model/Models');
router.post('/add',(req,res) => {
    var user = new users();
    user.name = req.body.name;
    user.Date = req.body.Date;
    user.Purpose = req.body.Purpose;
    user.BookClosure.push({
        start: req.body.BookClosure[0].start,
        end: req.body.BookClosure[0].end
    });
    
    user.Agenda = req.body.Agenda;
  
    user.save((err,users) => {
        if(err) {
            return res.status(400).send({
                message : err
            });
        }
        else {
            const data = users.toObject({ versionKey: false, getters: true });
            for(let i=0; i<data.BookClosure.length; i++) {
                delete data.BookClosure[0]._id;
            }
            return res.status(201).send({
                message : "AGM/EGMs added successfully",
                data : user
            });
        }
    })
});

var Controller = require('../Controller/Controller.js');

router.route('/get-all')
.get(Controller.index)

router.route('/:user_id')
.get(Controller.view)
.patch(Controller.update)
.put(Controller.update)
.delete(Controller.Delete)

router.route('/del-all')
.post(Controller.delall)

module.exports = router;
