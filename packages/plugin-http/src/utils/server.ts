import { Server } from "http";

let server: Server;

export const setServer = (newServer: Server) => (server = newServer);
export const getServer = () => server;
