import { Logger, Plugin } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger/dist";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { getSequelize, setSequelize } from "./utils/sequelize";

@Plugin({
	services: [],
})
export class SequelizePlugin {
	@Logger("[SequelizePlugin]:")
	logger!: HammerLogger;

	public static forFeature(options: SequelizeOptions) {
		const sequelize = new Sequelize(options);
		setSequelize(sequelize);

		return this;
	}

	public async onLoad() {
		this.logger.event("Syncing database...");

		const sequelize = await getSequelize().sync();
		setSequelize(sequelize);

		this.logger.success("Sequelize plugin loaded");
	}
}
