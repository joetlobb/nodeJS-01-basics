import { createServer, IncomingMessage, ServerResponse } from "http"; // TS
import * as fs from "fs";
import requestHandler from "./routes.js";

const server = createServer(requestHandler);

server.listen(3000);
