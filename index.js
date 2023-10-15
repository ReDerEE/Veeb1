const express = require('express');
const app = express();
const timeInfo = require("./dateTime_ET.js");
const fs = require("fs");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/timenow', (req, res)=>{
    const dateNow = timeInfo.dateETformatted();
    const timeNow = timeInfo.timeFormatted();
    res.render('timenow', {nowD: dateNow, nowT: timeNow});
    
});

app.get('/wisdom', (req, res)=>{
    let folkWisdoms = [];
    fs.readFile('public/txtFiles/vanasonad.txt', 'utf-8',(err, data)=>{
        if (err){
            throw err;
        }
        else {
            folkWisdoms = data.split(';');
            res.render('justlist', {h1: 'Vanasõnad', wisdom: folkWisdoms});
        }
    });
    //res.render('wisdom');
});
app.get('/names', (req, res)=>{
    let nameDateArray = []
    let nameArray = []
    fs.readFile('public/txtFiles/nameLog.txt', 'utf-8', (err, data)=>{
        if (err){
            throw err;
        }
        else{
            nameDateArray = data.split(";")
            for(i in nameArray){
                nameDateArray[i]=nameDateArray[i].replace(",", " ");
            nameDateArray.split(",");
            for(i in nameArray){
                nameArray.push()
            }
            }
            nameArray.pop(-1);
            res.render('namePage', {names: nameArray, h1: 'Inimesed, kes on külastanud'})
            
        }
    })
});

app.listen(5132);
