import { RoleCode } from "../database/models/role";
const RoleRepo = require("../database/repositories/RoleRepo");
const ParentRepo = require("../database/repositories/parentRepository");
const bcrypt = require("bcrypt");
const db = require("../database/models/index");

// seed Roles
export let seedRoles = async () => {
  console.log("seed");

  let roles = await RoleRepo.findAll({});
  if (roles.length == 0) {
    await RoleRepo.bulkCreate([
      {
        code: RoleCode.ADMIN,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: RoleCode.SUPERADMIN,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: RoleCode.PARENT,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
    console.log("Roles inserted successfully ✅");
  } else {
    console.log("Roles already exists ! ");
  }
};

//seed admin
export let seedParent = async () => {
  let roleparent = await RoleRepo.findOne({ where: { code: RoleCode.PARENT } });

  if (roleparent) {
    let parents = await ParentRepo.findOne({
      where: { roleId: roleparent.id },
    });

    if (parents.length > 0) {
      console.log("parent user exist");
    } else {
      try {
        let parent = {
          roleId: process.env.TEST_ROLE,
          name: process.env.TEST_FIRSTNAME,
          last_name: process.env.TEST_LASTNAME,
          email: process.env.TEST_EMAIL,
          address: process.env.TEST_ADDRESS,
          phone_number: process.env.TEST_PHONENUMBER,
          username: process.env.TEST_USERNAME,
          verified: process.env.TEST_BOOLEAN,
          confirmed: process.env.TEST_BOOLEAN,
          confirmation_token: process.env.TEST_CONFIRMATION_TOKEN,
          password: await bcrypt.hash(process.env.TEST_PASSWORD, 13),
          countries: process.env.TEST_COUNTRY,
          smsattempt: process.env.SMSATTEMPT,
          last_login_at: new Date(),
          password_requested_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await ParentRepo.create({ parent });
        console.log("parent user added sucessfuly ✅");
      } catch (error) {
        console.log("error 🚩 : ", error);
      }
    }
  } else {
    console.log("Role parent inexistant !");
  }
};

//seed deleting the db
export let seedDelete = async () => {
  db.role.destroy({
    where: {},
    truncate: true,
  });
  db.parent.destroy({
    where: {},
    truncate: true,
  });
  console.log("Collections empty successfuly ✅");
};
