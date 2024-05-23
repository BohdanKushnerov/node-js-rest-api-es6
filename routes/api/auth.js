import express from "express";
import { registerSchema, loginSchema } from "../../models/user.js";
import ctrl from "../../controllers/auth.js";
import validateBody from "../../middlewares/validateBody.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), ctrl.register);

authRouter.post("/login", validateBody(loginSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);

authRouter.patch("/users", authenticate, ctrl.subscriptionUpdate);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatars"),
  ctrl.updateAvatar
);

export default authRouter;
