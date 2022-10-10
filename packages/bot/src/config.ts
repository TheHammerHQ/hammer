import { config } from "dotenv";

config();

export const CONFIG = {
	BOT_TOKEN: process.env.BOT_TOKEN,
};
