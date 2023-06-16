import { NextFunction, Request, Response } from "express";
import ParentRepo from "../../database/repositories/parentRepository";
import { ParentAttributes } from "../../database/models/parents";
const db = require("../../database/models");
import bcrypt from "bcrypt";
const { Role } = require("../../database/models");
import crypto from "crypto";

import {
  InternalErrorResponse,
  NotFoundResponse,
  ErrorMessage,
} from "../../core/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { RoleCode } from "../../database/models/role";
const nations = require("../../countries.json");

export const createParent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, phone_number, countries } = req.body;
    //create the password hash with crypto
    const passwordHash = await bcrypt.hash(req.body.password, 13);

    if (countries !== "TN") {
      const selectedEmail = await ParentRepo.findOne({
        where: { email: req?.body?.email },
      });
      if (selectedEmail) {
        return res.json({
          type: "Validation Failed",
          title: "There was a validation error",
          errors: { email: "هذا البريد استخدم من قبل." },
        });
      }
    } else {
      const selectedphoneNumber = await ParentRepo.findOne({
        where: { phone_number: phone_number },
      });

      if (selectedphoneNumber) {
        return res.json({
          type: "Validation Failed",
          title: "There was a validation error",
          errors: { phoneNumber: "رقم الهاتف هذا قيد الاستخدام ." },
        });
      }
    }

    let selectedCountry = nations.find((item: any) => item.code == countries);
    if (!selectedCountry) {
      return next(new ErrorMessage("country doesn't exist").send(res));
    }

    const parentRole = await Role.findOne({
      where: { code: RoleCode.PARENT },
    });

    const parent = await ParentRepo.create({
      id: undefined,
      ...req.body,
      password: passwordHash,
      phone_number,
      email,
      confirmation_token: null,
      roleId: parentRole.id,
      username: `hanikids-Parent${Math.floor(
        100000000 + Math.random() * 900000000
      )}`,
      verified: true,
      confirmed: false,
      last_login_at: null,
      countries: countries,
      smsattempt: 0,
      password_requested_at: null,
    });

    res.status(201).json({
      status: "success",
      data: {
        parent,
      },
    });
  }
);

export const findPopulatedParents = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const parents = await ParentRepo.findAll({
      include: [
        {
          model: db.user,
        },
      ],
    }).catch((error: any) => next(new InternalErrorResponse(error).send(res)));

    res.status(200).json({
      status: "success",
      data: {
        parents,
      },
    });
  }
);

export const updateParent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const parent = await ParentRepo.findOne({
      where: { id: id },
    });

    if (!parent) {
      return next(
        new NotFoundResponse("No Parent found with that ID!").send(res)
      );
    } else {
      const selector = { where: { id: id } };

      const data = req.body as ParentAttributes;
      const password = await bcrypt.hash(req.body.password, 13);
      const newData = { ...data, password };
      await ParentRepo.update(newData, selector).catch((error: any) =>
        next(new InternalErrorResponse(error).send(res))
      );

      res.status(200).json({
        status: "success",
        message: "Parent updated successfully",
      });
    }
  }
);

export const allParents = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let perPage = parseInt(req.query?.perPage as any);
    let offset = 0;
    let page: any = req.query.page; // page number
    offset = perPage * (page - 1);
    if (!page && !perPage) {
      const parents = await ParentRepo.findAll({
        attributes: {
          exclude: ["password"],
        },
      }).catch((error: any) => {
        next(new InternalErrorResponse(error).send(res));
      });
      res.status(200).json({
        status: "success",
        data: {
          parents,
        },
      });
    } else {
      if (page < 1) page = 1;
      if (perPage < 1) perPage = 24;

      const parents = await ParentRepo.findAll({
        limit: perPage,
        offset: offset,
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json({
        status: "success",
        data: {
          parents,
        },
      });
    }
  }
);

export const getParent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const parent = await ParentRepo.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!parent) {
      return next(
        new NotFoundResponse("No Parent found with that ID!").send(res)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        parent,
      },
    });
  }
);

//soft delete
export const deleteParent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await ParentRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      return next(
        new NotFoundResponse("No Parent found with that ID!").send(res)
      );
    } else {
      await ParentRepo.destroy({ where: { id: id } });
      res.status(200).json({
        status: "success",
        message: "Parent deleted sucessfully ",
      });
    }
  }
);
