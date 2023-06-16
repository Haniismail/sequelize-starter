const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("parents", [
      {
        name: "Hani",
        last_name: "Ismail",
        email: "emailofhaniismail@gmail.com",
        address: "address of Hani",
        password: await bcrypt.hash(process.env.SEEDER_PASSWORD, 13),
        phone_number: 23878321,
        username: "Hani",
        verified: true,
        confirmed: true,
        roleId: 2,
        confirmation_token: 1,
        smsattempt: 2,
        password_requested_at: new Date(),
        countries: "TN",
        last_login_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("parents", null, {
      truncate: true,
      cascade: true,
    });
  },
};
