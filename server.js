import express from 'express'
// import mysql from 'mysql'
import cors from 'cors'
import bodyParser from 'body-parser'
import pg from 'pg'
const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//  const db=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'Nellore@123',
//     database:'harish'
//  })
const pool= new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
  });


pool.query('Select * from users',(err,res)=>{
if(!err){
    console.log(res.rows);
}else{
    console.log(err.message)
}
})
pool.connect();
app.get("/api/users",(req,res)=>{
    pool.query("Select * from users",(error,result)=>{
        if(!error){
            res.send(result.rows)
            }
    })
    pool.end;
})
 app.get("/api/users/:id",(req,res)=>{
    pool.query("Select * from users",(error,result)=>{
        if(!error){
            res.send(result.rows)
        }
    })
    pool.end;
 })
 app.post("/api/post", (req, res) => {
    const user=req.body;
    let insertQuery = `insert into users (id,name, street, postalcode, city) values (${user.id},'${user.name}','${user.street}','${user.postalcode}','${user.city}')`;
    pool.query(insertQuery, (error, result) => {
      if (!error) {
        res.send('Succesfully added')
      } else {
        console.log(error.message)
      }
    });
  });
  
  app.put("/api/put/:id", (req, res) => {
    const user = req.body;
  
    let updateQuery = `Update users set name='${user.name}', street='${user.street}', postalcode='${user.postalcode}', city='${user.city}' WHERE id=${user.id}`;
  
    pool.query(updateQuery, (error, result) => {
      if (!error) {
        res.send('Succesfully updated')
      } else {
        console.log(error.message)
      }
    });
  });
  app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
  
    let deleteQuery = `DELETE FROM users WHERE id=${id}`;
  
    pool.query(deleteQuery, (error, result) => {
      if (!error) {
        res.send('Succesfully deleted')
      } else {
        console.log(error.message)
      }
    });
  });
// app.get('/',(req,res)=>{
//     const sqlInsert="INSERT INTO usersdata (name,street,postalcode,city) VALUES ('teja', 'N.t.r nagar', '52456','Nellore')";
//     pool.query(sqlInsert,(err,result)=>{
//         console.log("error",err);
//         console.log("result",result);
//         res.send(result)
//     })
// })
   
app.listen(5000,()=>{
    console.log('listening on port 5000')
})
