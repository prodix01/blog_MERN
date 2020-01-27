const http = require("http");
const app = require("./app");
require("./db");



const server = http.createServer(app);
const PORT = process.env.PORT || "1234";

server.listen(PORT, console.log(`server started at http://localhost:${PORT}`));
