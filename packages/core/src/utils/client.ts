import { Client } from "discord.js";

let client: Client;

export const setClient = (newClient: Client) => (client = newClient);
export const getClient = () => client;
