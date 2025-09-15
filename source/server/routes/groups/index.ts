
import { Router } from "express";
import wrap from "../../utils/wrapAsync.js";
import bodyParser from "body-parser";

import {isManage, isUser } from "../../utils/locals.js";
import postGroup from "./post.js";
import getGroups from "./get.js";
import getGroup from "./group/get.js";
import patchGroup from "./group/patch.js";

const router = Router();

router.get("/", isUser, wrap(getGroups));
router.post("/", isManage, bodyParser.json(), wrap(postGroup));
router.get("/:group", isUser, wrap(getGroup));
router.patch("/:group", isManage, bodyParser.json(), wrap(patchGroup));

export default router;
