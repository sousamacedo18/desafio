const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;

router.post('/',(req,res)=>{
    const{email,senha}=req.body;
    mysql.getConnection((error,conn)=>{
     conn.query(
       "SELECT * FROM usuario where email like ? and senha like ?",
       [email,senha],
       (error,resultado,field)=>{
         conn.release();
         if(error){
          return res.status(500).send({
             error:error,
             response:null
           })
         }
         res.status(200).send({
           mensagem:"Dados do Usuário!!!!",
           usuario:resultado
         
         })
        }
       )
     })
})

    
 



module.exports=router;