import { Router } from "express";

import { getTasks, addTask, completeTask, removeTask } from "../controllers/taskController.js";

import { createTaskValidation, updateTaskValidation, validate} from "../middleware/taskValidator.js";

const router = Router();

//our crud routes...
router.get("/", getTasks);

router.post("/",createTaskValidation,validate, addTask);

router.put("/:id",updateTaskValidation,validate,completeTask);

router.delete("/:id", removeTask);

export default router;