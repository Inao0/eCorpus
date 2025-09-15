
import { Request, Response } from "express";

import { getUserManager, getVfs } from "../../../utils/locals.js";
import UserManager from "../../../auth/UserManager.js";
import { BadRequestError } from "../../../utils/errors.js";




export default async function patch(req: Request, res: Response) {
  let userManager: UserManager = getUserManager(req);
  let { group: groupName } = req.params
  let group = await userManager.getGroup(groupName, false);
  let { members, ...remainings } = req.body;
  if (Object.keys(remainings).length != 0) {
    throw new BadRequestError("Unknowns keys: " + Object.keys(remainings).toString());
  }
  //Ensure all or none of the changes are comitted
  let result = await getVfs(req).isolate(async (vfs) => {
    if (typeof members === "string" || Array.isArray(members)) {
      group.members = group.members ?? [];
      //TODO why filter
      const membersArray = (Array.isArray(members) ? members : [members]).map(t => (typeof t === "string") ? t.trim() : t).filter(t => t);
      for (let member of membersArray) {
        let username = member.trim();
        if (!username) continue;
        else if (group.members.indexOf(username) !== -1) continue;
        await userManager.addMemberToGroup(username, group.group_id);
      }
      for (let ex_members of group.members) {
        if (members.indexOf(ex_members) !== -1) continue;
        await userManager.removeMemberFromGroup(ex_members, group.group_id);
      }
    }

    return await userManager.getGroup(groupName);
  })
  res.status(200).send(result);
};
