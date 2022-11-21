const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const mysql = require("./mysql").pool;

app.use((req, res, next) => { //doesn't send response just adjusts it
  res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
  );
  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
      return res.status(200).json({});
  }
  next(); //so that other routes can take over
})


app.post('/logar',(req,res)=>{
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

         const result={
                id:resultado[0].id,
                nome:resultado[0].nome,
                email:resultado[0].email
         }
         res.status(200).send({
           mensagem:"Dados do Usuário!!!!",
           usuario:result
         
         })
        }
       )
     })
});
app.post('/feedback',(req,res)=>{
    const{idusuario,idcurso,feedback}=req.body;
    mysql.getConnection((error,conn)=>{
      conn.query(
        `SELECT COUNT(*) as total FROM 
        reacao WHERE reacao.usuarioid=? 
        and reacao.cursoid=?`,
        [idusuario,idcurso],
        (error,resultado,field)=>{
          conn.release();
          if(error){
           return res.status(500).send({
              error:error,
              response:null
            })
          }
          // if(resultado.length>0){
          //   return res.status(406).send({
          //     mensagem:"Reação duplicada!"
          //   })
          // }
          mysql.getConnection((error,conn)=>{
            conn.query(
              "INSERT INTO `reacao`(`usuarioid`, `cursoid`, `feedback`) value(?,?,?)",
              [idusuario,idcurso,feedback],
              (error,resultado,field)=>{
                conn.release();
                if(error){
                 return res.status(500).send({
                    error:error,
                    response:null
                  })
                }
                mysql.getConnection((error,conn)=>{
                  conn.query(
                    `SELECT COUNT(*) as total FROM 
                    reacao WHERE reacao.cursoid=? and feedback=?`,
                    [idcurso,feedback],
                    (error,resultado,field)=>{
                      conn.release();
                      if(error){
                       return res.status(500).send({
                          error:error,
                          response:null
                        })
                      }
                      res.status(200).send(
                        {
                          mensagem:"Contagem de reações",
                          total:resultado.total
                        }
                      )
                    });
                  });
               }
              )
            })
          
      })
     }
    )
});


app.get('/curso',(req,res)=>{
      mysql.getConnection((error,conn)=>{
     conn.query(
       `SELECT 
       id,
       nome,
       (select count(reacao.id) from reacao 
        WHERE reacao.cursoid=curso.id and reacao.feedback=true) 
        as "like",
        (select count(reacao.id) from reacao 
        WHERE reacao.cursoid=curso.id and reacao.feedback=false) 
        as "deslike",
        foto
       FROM curso `,
       (error,resultado,field)=>{
         conn.release();
         if(error){
          return res.status(500).send({
             error:error,
             response:null
           })
         }
          res.status(200).send({
           mensagem:"Dados do Curso!!!!",
           curso:resultado
         
         })
        }
       )
     })
});
app.get('/curso/:id',(req,res)=>{
    const id = req.params.id;
      mysql.getConnection((error,conn)=>{
     conn.query(
       `SELECT * FROM curso where id=${id}`,
       (error,resultado,field)=>{
         conn.release();
         if(error){
          return res.status(500).send({
             error:error,
             response:null
           })
         }
          res.status(200).send({
           mensagem:"Dados do Curso!!!!",
           curso:resultado
         
         })
        }
       )
     })
});
app.get('/',(req,res)=>{
    mysql.getConnection((error,conn)=>{
        conn.query(
          "SELECT * FROM `usuario` ",
          (error,resultado,field)=>{
            conn.release();
            if(error){
             return res.status(500).send({
                error:error,
                response:null
              })
            }
            const result=[];
            resultado.map(linha=>{
              result.push(
                {
                  id:linha.id,
                  nome:linha.nome,
                  email:linha.email
                }
              )
            });


       
            res.status(200).send({
              mensagem:"aqui é a lista de usuários!!!!",
              usuario:result
            
            })
          }
          )
     })  
})

module.exports = app