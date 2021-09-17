const express = require('express')
const storage = require('node-persist')
const app = express()
app.use(express.urlencoded({extended: false}))
const port = 3500

var timestamp = new Date().getTime()
timestamp = (timestamp - timestamp % 1000) / 1000

storage.init({
    dir: 'savelog',
});
  
async function getAllLogs() {
    let allLogs = await storage.getItem('Logs');
    if (typeof allLogs === 'undefined') {
      return [];
    }
    return allLogs;
}

  
async function addLog(level, message) {
    let allLogs = await getAllLogs();
    var timestampnow = new Date().getTime()
    timestampnow = (timestampnow - timestampnow%1000)/1000

    allLogs.push({
        ID : allLogs.length + 1,
        timestampnow: timestampnow,
        level: level,
        message: message
    });
  
    await storage.setItem('Logs', allLogs);
}

app.get('/timestamp', (req, res)=>{
    res.send({timestamp})
})

app.get('/logs', function(req, res) {
    const limit = req.query.limit;
    if(limit === undefined) {
        res.send(`
            <h1> Data </h1>
            <form action="/done" method="POST">
                <input type="text" name="level" placeholder="level">   
                <input type="text" name="message" placeholder="message">    
                <button> Submit </button>
            </form>
        `)
    } else {
        storage.getItem('Logs').then(values => {
            let logs = values.slice(-limit)
            res.send(JSON.stringify({logs}, null, 4))
        })
    }
    
});

app.post('/done', (req, res)=> {
    addLog(req.body.level, req.body.message)
    res.send("Thanks for nothings")
})
app.get('/done', (req, res)=> {
    res.send("404 :D")
})

app.listen(port)