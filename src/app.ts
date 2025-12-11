import { createServer, IncomingMessage, ServerResponse } from "http"; // TS

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(req.url, req.method, req.headers);
  // process.exit()
});

server.listen(3000);
