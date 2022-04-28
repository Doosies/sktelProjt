const express = require("express"); 
const app = express();
const port = 8080; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host : "localhost",
    user : "root", //mysql의 id
    password : "IaM@80(SonGMY)", //mysql의 password
    database : "shopDB", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/api', (req, res) =>{
    res.send('/에 들어옴')
})

app.get("/api/select", (req,res)=>{
    // const test = req.body.test;
    // console.log(req.body);
    // connection.query("INSERT INTO test (test_body) values (?)",[test],
    // function(err,rows,fields){
    //     if(err){
    //         console.log("실패");
    //         // console.log(err);
    //     }else{
    //         console.log("성공");
    //         // console.log(rows);
    //     };
    // });
    // console.log(req.body);
    connection.query('SELECT * FROM memberTBL;', (err, rows, fields)=>{
        if(err){
            console.log('failed');
        }else{
            console.log('success');
            res.send(rows);
        }
    })

    
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})