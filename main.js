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
  
  async function getAllEmployees() {
    let allEmployees = await storage.getItem('employees');
  
    if (typeof allEmployees === 'undefined') {
      return [];
    }
  
    return allEmployees;
  }

  
  async function addEmployee(level, message) {
    let allEmployees = await getAllEmployees();
    allEmployees.push({
        ID : allEmployees.length + 1,
        timestamp: timestamp,
        level: level,
        message: message
    });
  
    await storage.setItem('employees', allEmployees);
    // console.log(allEmployees.length)
    // console.log(await storage.getItem('employees'));
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
        storage.getItem('employees').then(values => {
            let logs = values.slice(0, limit)
            res.send(JSON.stringify({logs}, null, 4))
        })
    }
    
});

app.post('/done', (req, res)=> {
    // console.log("Done")
    addEmployee(req.body.level, req.body.message)
    res.send("Thanks for nothings")
})
app.get('/done', (req, res)=> {
    res.send("404 :D")
})




app.listen(port)