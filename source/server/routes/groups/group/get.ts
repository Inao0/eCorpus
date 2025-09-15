import { Request, Response } from "express";
import { getUserManager } from "../../../utils/locals.js";
import UserManager from "../../../auth/UserManager.js";

export default async function getGroup(req: Request, res: Response) {
    let userManager: UserManager = getUserManager(req);
    const { group } = req.params;
    let groups = await userManager.getGroup(group);
    res.status(200).send(groups);
}