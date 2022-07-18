const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Problems: 
// Only one session allowed at a time.
// Means, we need for every request a new session.

// neo4j-driver
const neo4j = require("neo4j-driver");
// construct a driver
// one driver is enough for one db application
const driver = neo4j.driver(
    "neo4j://localhost",
    neo4j.auth.basic("admin", "12345")
)
// start a session to gain access to the db
// const session = driver.session({ defaultAccessMode: neo4j.session.READ })
// when you're done, close the driver
// await driver.close()

// the function speaks for itself
/* 
const getNodesByCypher = async function (cypher) {
    return session.run(cypher)
} 
*/

// "result" comes from getNodes (promise)
// console.log(result.records[0]._fields)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));


// routes for raw db data
// - movies
app.get("/api/movies", (req, res) => {
    const session = driver.session({ defaultAccessMode: neo4j.session.READ })
    const results = session.run("MATCH (n:Movie) RETURN n")
    results.then(async result => {
        session.close();
        res.status(200).json({ result })
    }
    ).catch(err => {
        res.status(500).json({ error: err.toString() })
    })
})

// - actors
app.get("/api/actors", (req, res) => {
    const session = driver.session({ defaultAccessMode: neo4j.session.READ })
    const results = session.run("MATCH (n:Person) RETURN n")
    results.then(async result => {
        session.close();
        res.status(200).json({ result })
    }
    ).catch(err => {
        res.status(500).json({ error: err.toString() })
    })
})

// route for accepting the querry for the search
app.post("/api/query", (req, res) => {

})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
