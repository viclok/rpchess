const express = require('express');
const app = express();
const cors = require("cors")
const corsOptions = {
    origin: ["http://localhost:5173"],
}
app.use(cors(corsOptions))

app.get("/api", (req, res) => {
    res.json({fruits: ["apple", "orange"]})
})

app.listen(8080, () => {
    console.log("Server started on port 8080")
})
// const path = require('path');


// const port = 3000;
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// const { Chess } = require('chess.js')

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', (socket) => {
//     console.log('a user connected');
//   });

// // Define the root route
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Start the server
// server.listen(port, () => {
//     console.log(`Server running at http://127.0.0.1:${port}/`);
// });
