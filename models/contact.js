import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongooseError.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleMongooseError);

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
