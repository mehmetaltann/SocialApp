import { Sequelize } from "sequelize";

const sequelize = new Sequelize("altan", "username", "pass", {
  dialect: "sqlite",
  storage: "../altan.db",
});

export default sequelize;
