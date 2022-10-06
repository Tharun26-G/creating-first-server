const http = require("http");
const { resolve } = require("path");
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
                        let newTodo = todolist;
                        newTodo.push(body.item);
                        console.log(newTodo);
                        response.writeHead(201);

                    });
            } else if (method === "DELETE") {
                let body = "";
                request.on('error', () => {
                        console.error(err)
                    })
                    .on('data', (chunk) => {
                        body += chunk;
                    })
                    .on('end', () => {
                        body = JSON.parse(body);
                        let deletethis = body.item;

                        for (let i = 0; i < todolist.length; i++) {
                            if (todolist[i] === deletethis) {
                                todolist.splice(i, 1);
                                break;
                            }
                        }

                        response.writeHead(203);
                    })
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