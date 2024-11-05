import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/create", createTask); // done
router.post("/duplicate/:id", duplicateTask); // done
router.post("/activity/:id", postTaskActivity); // done

router.get("/dashboard", dashboardStatistics);
router.get("/", getTasks); // done
router.get("/:id", getTask); // done

router.put("/create-subtask/:id", createSubTask); // done
router.put("/update/:id", updateTask); // done
router.put("/:id", trashTask); // done

router.delete(
  "/delete-restore/:id?",
  protectRoute,

  deleteRestoreTask
);

export default router;
