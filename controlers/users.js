const users = require("../models/shema/users")
const mongoose = require('mongoose');

module.exports = class UsersController {
     async select(req, res){
        users.find({}).exec()
            .then(async (responce)=>{
                res.status(200).send(responce)
            })
            .catch((err)=>{throw err})
    }

    async insert(req, res) {
             const body = req.body;
             const new_record = new users({
                 name: body.name,
                 surname: body.surname,
                 description: body.description,
                 avatar: body.avatar
             });
             new_record.save()
                 .then(() => {
                     res.json({new_record})
                 })
                 .catch(err => {
                     throw err
                 })
    }

    async read(req, res){
        users.findOne({ _id: req.params.id }).then(post => {
            if (!post) {
                res.send({ error: 'not found' });
            } else {
                res.json(post);
            }
        });
    }

    async update(req, res){
         users.findOneAndUpdate({_id:req.params.id}, { $set: req.body }, err => {
             if (err) {
                 res.send(err);
             }else {
                 res.json({status: 'updated'});
             }
         });
    }

    async delete(req, res){
        users.findOneAndDelete({
            _id: req.params.id,
        }).then(post => {
            if (post) {
                res.json({ status: 'deleted' });
            } else {
                res.json({ status: 'error' });
            }
        });
    }

    async filter(req, res){
        await users.find(
            {
                name: {$regex: req.params.text}
            }).exec()
            .then(result =>{
                res.status(200).json(result);
            })
            .catch(err=>{throw err})
    }
}