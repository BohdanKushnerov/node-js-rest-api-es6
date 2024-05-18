import express from "express";
import ctrl from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import {
  createContactSchema,
  updateFavoriteSchema,
} from "../../models/contact.js";
import isValidMongooseId from "../../middlewares/isValidMongooseId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidMongooseId, ctrl.getOneContact);

contactsRouter.post("/", validateBody(createContactSchema), ctrl.createContact);

contactsRouter.put(
  "/:id",
  isValidMongooseId,
  validateBody(createContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidMongooseId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

contactsRouter.delete("/:id", isValidMongooseId, ctrl.deleteContact);

export default contactsRouter;
