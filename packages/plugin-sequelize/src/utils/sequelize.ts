import { Sequelize } from "sequelize-typescript";

let sequelize: Sequelize;

export const setSequelize = (newSequelize: Sequelize) =>
	(sequelize = newSequelize);
export const getSequelize = () => sequelize;
