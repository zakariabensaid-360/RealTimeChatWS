const { Database} = require("sqlite")
const db = new Database()
const WebSocket = require("ws");
const { Login } = require("./models/Login");
const { createUser } = require("./models/CreateUser");
const wss = new WebSocket.Server({port: 8080});






wss.on("connection", (ws) => {    
    ws.on("message", (raw) => {

        try {
            const data = JSON.parse(raw); 
            if (!data.password || !data.email) throw "missing required feilds"
            if(Login(data.email, data.password) === null) {
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