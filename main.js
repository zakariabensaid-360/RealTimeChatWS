const { Database} = require("sqlite")
const db = new Database()
const WebSocket = require("ws");
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
            if (!data.user) throw "The user is required"
            if(users.get(data.user) === undefined) {
                users.set(data.user, ws)
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