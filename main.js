const express = require('express')
const storage = require('node-persist')
const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3500

storage.init({
    dir: 'savelog',
});

function timestampnow() {
    return Math.floor((new Date())/1000);
}
  
async function getAllLogs() {
    let allLogs = await storage.getItem('Logs');
    if (typeof allLogs === 'undefined') {
      return [];
    }
    return allLogs;
}

  
async function addLog(level, message) {
    let allLogs = await getAllLogs();

    allLogs.push({
        ID : allLogs.length + 1,
        timestampnow: timestampnow(),
        level: level,
        message: message
    });
  
    await storage.setItem('Logs', allLogs);
}

app.get('/timestamp', (req, res)=>{
    const timestamp = timestampnow()
    res.json({timestamp})
})

app.get('/logs', (req, res) => {
    console.log("GeT");
    const limit = req.query.limit;
    storage.getItem('Logs').then(values => {
        let logs = values.slice(-limit)
        res.send(JSON.stringify({logs}, null, 4))
    })
});

app.post('/logs', (req, res)=> {
    addLog(req.body.level, req.body.message)
    .then(() => res.json())
    .catch(() => res.json({error:1}));
})


app.listen(port)
