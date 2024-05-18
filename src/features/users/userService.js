import { sequelize, Sequelize } from "../../common/helpers/database.js";

const getAllUsers = async () => {
  try {
    const users = await sequelize.query("SELECT id, name, token FROM users", {
      type: Sequelize.QueryTypes.SELECT,
    });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getAllUsers,
};
