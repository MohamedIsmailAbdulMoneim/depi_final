import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { fetchTasks } from "../APIS/Apis";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const [taskFilter, setTaskFilter] = useState("completed");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/completed/completed") {
      setTaskFilter("completed");
    } else if (pathname === "/in-progress/in_progress") {

      setTaskFilter("in progress");
    }
    else if (pathname === "/tasks") {

      setTaskFilter("tasks");
    }
    else if (pathname === "/todo/todo") {

      setTaskFilter("todo");
    } else {
      setTaskFilter("all");
    }
  }, [location.pathname]);

  console.log("All tasks:", tasks);
  console.log("Task filter:", taskFilter);

  if (loading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  const filteredTasks = tasks.filter((task) => {

    if (taskFilter === "tasks") return true;

    return task.stage === taskFilter




  });

  console.log("Filtered tasks:", filteredTasks);




  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={taskFilter !== "all" ? `${taskFilter} Tasks` : "Tasks"} />

        {taskFilter === "tasks" && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
          {taskFilter === "all" && (
            <>
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle
                label="In Progress"
                className={TASK_TYPE["in progress"]}
              />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} />
            </>
          )}
          {taskFilter === "completed" && (
            <TaskTitle label="Completed" className={TASK_TYPE.completed} />
          )}
          {taskFilter === "in progress" && (
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
          )}
          {taskFilter === "todo" && (
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
          )}
        </div>

        {selected !== 1 ? (
          <BoardView tasks={filteredTasks} />
        ) : (
          <div className="w-full">
            <Table tasks={filteredTasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
