import { config } from "dotenv";

config();

export const CONFIG = {
	BOT_TOKEN: process.env.BOT_TOKEN as string,
	CLIENT_ID: "959843658910277642",
};
