import { createServer, IncomingMessage, ServerResponse } from "http"; // TS

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(req);
});

server.listen(3000);
