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
    let dateArray = []
    fs.readFile('public/txtFiles/nameLog.txt', 'utf-8', (err, data)=>{
        if (err){
            throw err;
        }
        else{
            nameDateArray = data.split(/[\;, ]+/)
            nameDateArray.pop(-1);
            for(let i = 0; i < nameDateArray.length ; i+=3){
                console.log(i)
                console.log(nameDateArray[i])
                nameArray.push(nameDateArray[i]+" "+nameDateArray[i+1]);
                dateArray.push(timeInfo.ENtoEE(nameDateArray[i+2]));
            }
            res.render('namePage', {names: nameArray,dates: dateArray, h1: 'Inimesed, kes on külastanud'})
            
        }
    })
});

app.listen(5132);
