import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

config();

export const env = cleanEnv(process.env, {
	BOT_TOKEN: str(),
	BOT_ID: str(),
});

export const CONFIG = {
	...env,
};
