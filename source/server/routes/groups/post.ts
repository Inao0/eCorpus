
import { Request, Response } from "express";

import { getUserManager } from "../../utils/locals.js";
import UserManager from "../../auth/UserManager.js";
import { BadRequestError } from "../../utils/errors.js";




export default async function postGroup(req :Request, res :Response){
  let userManager :UserManager = getUserManager(req);
  console.log(req.body);
  let {name} = req.body;
  if(!name) throw new BadRequestError("name not provided");
  let group = await userManager.addGroup(name);
  res.status(201).send(group);
};
