import { createServer, IncomingMessage, ServerResponse } from "http"; // TS
import * as fs from "fs";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  //   console.log(req.url, req.method, req.headers);
  //   process.exit();

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    const body: Buffer[] = [];
    req.on("data", (chunk: Buffer) => {
      body.push(chunk);
      console.log(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message: string = parsedBody.split("=")[1] as string;
      // fs.writeFileSync('message.txt', message); // will block next line execution until this write file is done
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      }); // this one write file asynchronously
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
