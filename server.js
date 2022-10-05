const http = require("http");
const port = 7089;

http
    .createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("<h1>hello, this is from my server</h1 >");
        response.end();


    })
    .listen(port, () => {
        console.log(`Nodejs servr started on port ${port}`);
    });