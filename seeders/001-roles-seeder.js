module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [
      {
        status: 1,
        code: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 1,
        code: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 1,
        code: "parent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 1,
        code: "child",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
