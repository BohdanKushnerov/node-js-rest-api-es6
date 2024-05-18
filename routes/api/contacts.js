import express from "express";
import {
  createContactSchema,
  updateFavoriteSchema,
} from "../../models/contact.js";
import ctrl from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import isValidMongooseId from "../../middlewares/isValidMongooseId.js";
import authenticate from "../../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrl.getAllContacts);

contactsRouter.get("/:id", authenticate, isValidMongooseId, ctrl.getOneContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidMongooseId,
  validateBody(createContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidMongooseId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidMongooseId,
  ctrl.deleteContact
);

export default contactsRouter;
