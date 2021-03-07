const express = require('express');
const Joi = require('joi');
const router = express.Router();
const Message = require("../models/message");
const ws = require("../wslib");

function validateMessage(message, forUpdate) {
  const p = new RegExp("([A-Za-z])+( [A-Za-z]+)");
  const schema = Joi.object({
    author: (forUpdate?  Joi.string().pattern(p).optional() : Joi.string().pattern(p).required()),
    message: (forUpdate? Joi.string().min(5).optional() : Joi.string().min(5).required()),
    ts : Joi.optional()
  });
  return schema.validate(message).error;
}

/* GET message list. */
router.get('/', function(req, res, next) {
  Message.findAll().then( result => {
    res.send(result);
  });
});

/* GET a message given its timestamp. */
router.get('/:ts', function(req, res, next) {
  Message.findByPk(req.params.ts).then( result => {
    if(result === null) return res.status(404).send("Message not found");
    res.send(result);
  });
});

/* POST a message. */
router.post('/', function(req, res, next) {
  const error = validateMessage(req.body,false);
  if (error) return res.status(400).send(error.details[0].message);
  const { author , message } = req.body;
  const ts = Date.now();

  Message.create({ts, author , message }).then( result => {
    res.send(result);
  });
  //update front
  ws.sendMessages();
});

/* UPDATE a message. */
router.put('/:ts',function(req, res, next){
  const error = validateMessage(req.body,true);
  if (error) return res.status(400).send(error.details[0].message);
  
  Message.update(req.body, {where: {ts: req.params.ts}}).then( result => {
    if(result[0] === 0) return res.status(404).send("Message not found");
    res.status(200).send("Message updated!");
  });
  //update front
  ws.sendMessages();
});

/* DELETE a message. */
router.delete('/:ts', function(req, res, next) {
  Message.destroy({where: {ts: req.params.ts}}).then( result => {
    if(result === 0) return res.status(404).send("Message not found");
    res.status(204).send("Message removed!");
  });
  //update front
  ws.sendMessages();
});

module.exports = router;