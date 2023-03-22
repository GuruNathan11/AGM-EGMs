const { use } = require('../Routes/routes.js');
var users = require('../Model/Models');

exports.Dao_index = function(req,callback){
    users.get(function (err,user){
        if (err)
        callback.json({
            status : "Error",
            message: err
        });
        else{
            if(user===null){
                callback.json({
                    status : "Success",
                    message: " AGM/EGMs empty. Please add some AGM/EGMs"
                });
            }
        
        callback.json({
            status : "Success",
            message: "Got user AGM/EGMs details Successfully",
            data   : user
        });
    }
    });
};

exports.Dao_view = function (req,callback){
    users.findById({_id:req.params.user_id}, function (err,user){
        if(err) callback.json({ message : "error"})
        else{
            if(user===null){
                callback.json({ message : "No such id is found"})
            }else{
                callback.json({
                    message : "User AGM/EGMs Details",
                    data    : user
                })
            }
        }
    })
}

exports.Dao_update = function (req,callback) {
    users.findById({_id:req.params.user_id}, function(err,user){
        if(err) callback.send(err);
        user.companyName = req.body.companyName;
    user.date = req.body.date;
    user.purpose = req.body.purpose;
    user.bookClosureStart = req.body.bookClosureStart;
    user.bookClosureEnd = req.body.bookClosureEnd;
    user.Agenda = req.body.agenda;

        user.save(function(err){
            if(err) callback.json(err);
            callback.json({
                message : "User AGM/EGMs Details Updated Successfully",
                data    : user
            });
        });
    });
};

exports.Dao_Delete = function (req,callback){
    users.findByIdAndDelete({_id:req.params.user_id}, function(err,user){
        // if (err) callback.send(err);
        // callback.json({
        //     message : "User Stock details deleted successfully",
        //     data    : user
        if(err) callback.json({ message : "error"})
        else{
            if(user===null){
                callback.json({ message : "No such id is found"})
            }else{
                callback.json({
                    message : "User AGM/EGMs Details deleted",
                    data    : user
        });
    }
}
    });
};

exports.Dao_delall = function (req,callback){
    users.deleteMany({}, function(err,user){
        if (err) callback.send(err);
        callback.json({
            message : "All AGM/EGMs details are deleted successfully",
            data    : user
        });
    });
};
