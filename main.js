const { Database} = require("sqlite")
const db = new Database()
const WebSocket = require("ws");
const { getUser } = require("./models/GetUser");
const { createUser } = require("./models/CreateUser");
const wss = new WebSocket.Server({port: 8080});


const users = new Map()
const SendMessqge = (to, message, ws) => {
    if(users.get(to) === undefined) return ws.send({
        code: 404,
        message: "The user not found"
    })

    const user = users.get(to)
    user.send(message)
}



wss.on("connection", (ws) => {    
    ws.on("message", (raw) => {

        try {
            const data = JSON.parse(raw); 
            if (!data.password || !data.email) throw "missing required feilds"
            if(getUser(data.email, data.password) === null) {
                ws.send({
                    "error": 404,
                    "errorMessage": "the user does not exist"
                })
                ws.close()
            }  


            switch(data.type) {
                case "SendMessqge":
                    SendMessqge(data.to, data.message, ws)
            }


        } catch (error) {
            ws.close(); 
        }


        
    });
    ws.on("error", (error) => {
        console.error("WebSocket error:", error);
    });
});



module.exports = {
    db  
};