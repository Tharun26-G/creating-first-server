const http = require("http");
const port = 7089;

const todolist = ["FSWD complete", "Party time"]

http
    .createServer((request, response) => {
        const { method, url } = request;
        if (url === "/todos") {
            if (method === "GET") {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(todolist.toString());
            } else if (method === "POST") {
                let body = "";
                request
                    .on('error', (err) => {
                        console.error(err);
                    })

                .on("data", (chunk) => {
                        body += chunk;
                    })
                    .on("end", () => {
                        body = JSON.parse(body);
                        console.log("data:", body);
                    });
            } else {
                response.writeHead(404);
            }
        } else {
            response.writeHead(404);
        }


        response.end();


    })
    .listen(port, () => {
        console.log(`Nodejs servr started on port ${port}`);
    });