var express = require('express');
var router = express.Router();
const fs = require('fs');

const users = fs.readFileSync('data.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

router.get('/:email', (req,res,next)=>{
  const user = users.find((item) => item.email === parseInt(req.params.email));
  if(!user) return res.status(404).send("The user is not found");
  res.send(user);
});

router.post('/', function(req, res, next) {
  const user = req.body;
  users.push(user);
  res.send(user);
});

router.put('/:email', (req,res,next)=>{
  const user = users.find((item) => item.email === parseInt(req.params.email));
  if(!user) return res.status(404).send("The user is not found");

  for (const property in req.body) {
    user[property] = req.body[property];
  }
  res.send(user);
});

router.delete('/:email', (req,res,next)=>{
  const user = users.find((item) => item.email === parseInt(req.params.email));
  if(!user) return res.status(404).send("The user is not found");
  res.send(user);

  const index = users.indexOf(user);
  users.splice(index,1);
  res.status(204).send("User deleted!");
});

module.exports = router;
