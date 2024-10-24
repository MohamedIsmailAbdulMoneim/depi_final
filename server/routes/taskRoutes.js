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

router.post("/create", protectRoute, isAdminRoute, createTask); // done
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask); // done
router.post("/activity/:id", protectRoute, postTaskActivity); // done

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks); // done
router.get("/:id", protectRoute, getTask); // done

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask); // done
router.put("/update/:id", protectRoute, isAdminRoute, updateTask); // done
router.put("/:id", protectRoute, isAdminRoute, trashTask); // done

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  isAdminRoute,
  deleteRestoreTask
);

export default router;
