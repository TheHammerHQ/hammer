import { config } from "dotenv";

config();

export const CONFIG = {
	BOT_TOKEN: process.env.BOT_TOKEN as string,
	CLIENT_ID: "959843658910277642",
	DATABASE: {
		host: process.env.POSTGRE_HOST as string,
		port: parseInt(process.env.POSTGRE_PORT as string),
		username: process.env.POSTGRE_USER as string,
		password: process.env.POSTGRE_PASSWORD as string,
		database: process.env.POSTGRE_DB_NAME as string,
	},
};
