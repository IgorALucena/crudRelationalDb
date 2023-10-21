var express = require('express');
var router = express.Router();
var db = require('../models/db');

router.get('/', async (req, res, next)=>{
  try {
    const all = await db.allUsers();
    res.status(200).render('index', { users: all });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Could not find the data." });
  }
});

router.post("/addUser", async (req, res)=>{
  try {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email
    await db.userInsert({ fname: fname, lname: lname, email: email });
    res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(400).json({ erro: "Failed to register new user." });
  }
});

router.get("/deleteUser/:userId", async (req, res)=>{
  try {
    const id = req.params.userId;
    await db.userDelete(id);
    res.status(204).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(400).json({ erro: "Unable to delete user." });

  }
});

router.get("/edit/:id",async (req,res)=>{ 
  try{
    const id = req.params.id;
    const consulta = await db.userQuery(id);
    console.log(consulta);
    res.status(200).render("/edit",{consulta:consulta});
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ erro: "User does not exist." });
  } 
});

router.post("/updateUser/:id", async (req,res)=>{ 
  try{
      const id = req.params.id;
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      await db.userUpdate({id:id, fname: fname, lname: lname, email: email});
      res.status(200).redirect("/");
  }catch(error){
      console.log(error);
      res.status(400).json({erro:"Unable to update customer data."});

  }
});

module.exports = router;
