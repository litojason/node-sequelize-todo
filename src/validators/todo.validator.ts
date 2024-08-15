import * as yup from "yup";

import { validateRequest } from "../middlewares/validator";

export type TodoFormData = {
  title: string;
  description: string;
  isCompleted: boolean;
};
const todoSchema = yup.object().shape({
  title: yup.string().required("Title is required.").label("Title"),
  description: yup
    .string()
    .required("Description is required.")
    .label("Description"),
  isCompleted: yup
    .boolean()
    .required("Is Completed is required.")
    .label("Is Completed"),
});
export const validateTodo = validateRequest(todoSchema);
