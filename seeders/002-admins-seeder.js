const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminRole = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE code = 'admin'`
    );
    const adminRoleId = adminRole[0][0].id;

    const superAdminRole = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE code = 'superadmin'`
    );
    const superadminRoleId = superAdminRole[0][0].id;
    return queryInterface.bulkInsert("Admins", [
      //Admin seeder
      {
        id : 1,
        username: "hani",
        password: await bcrypt.hash(process.env.SEEDER_PASSWORD, 13),
        email: "admin@example.com",
        roleId: adminRoleId,
        birthday: new Date(Date.now()),
        firstname: "Hani",
        last_name: "Ismail",
        photo: null,
        website: "www.HaniIsmail.com",
        local: "sousse",
        phone: 23878321,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Super admin seeder
      {
        id : 2,
        username: "Hani",
        password: await bcrypt.hash(process.env.SEEDER_PASSWORD, 13),
        email: "SuperAdminEmail@example.com",
        roleId: superadminRoleId,
        birthday: new Date(Date.now()),
        firstname: "Hani",
        last_name: "Ghali",
        photo: null,
        website: "www.HaniGhali.com",
        local: "sousse",
        phone: 23878321,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Admins", null, {});
  },
};
