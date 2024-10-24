// import React, { useState } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import Loading from "../components/Loader";
// import Title from "../components/Title";
// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";
// import Tabs from "../components/Tabs";
// import TaskTitle from "../components/TaskTitle";
// import BoardView from "../components/BoardView";
// import { tasks } from "../assets/data";
// import Table from "../components/task/Table";
// import AddTask from "../components/task/AddTask";

// const TABS = [
//   { title: "Board View", icon: <MdGridView /> },
//   { title: "List View", icon: <FaList /> },
// ];

// const TASK_TYPE = {
//   todo: "bg-blue-600",
//   "in progress": "bg-yellow-600",
//   completed: "bg-green-600",
// };

// const Tasks = () => {
//   const params = useParams();

//   const [selected, setSelected] = useState(0);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const status = params?.status || "";

//   return loading ? (
//     <div className='py-10'>
//       <Loading />
//     </div>
//   ) : (
//     <div className='w-full'>
//       <div className='flex items-center justify-between mb-4'>
//         <Title title={status ? `${status} Tasks` : "Tasks"} />

//         {!status && (
//           <Button
//             onClick={() => setOpen(true)}
//             label='Create Task'
//             icon={<IoMdAdd className='text-lg' />}
//             className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
//           />
//         )}
//       </div>

//       <Tabs tabs={TABS} setSelected={setSelected}>
//         {!status && (
//           <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
//             <TaskTitle label='To Do' className={TASK_TYPE.todo} />
//             <TaskTitle
//               label='In Progress'
//               className={TASK_TYPE["in progress"]}
//             />
//             <TaskTitle label='completed' className={TASK_TYPE.completed} />
//           </div>
//         )}

//         {selected !== 1 ? (
//           <BoardView tasks={tasks} />
//         ) : (
//           <div className='w-full'>
//             <Table tasks={tasks} />
//           </div>
//         )}
//       </Tabs>

//       <AddTask open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Tasks;


import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
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

  // Get tasks and loading state from the Redux store
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const status = params?.status || "";

  // Fetch tasks when the component mounts
  useEffect(() => {
    dispatch(fetchTasks()); // Dispatch the action to fetch tasks from the API
  }, [dispatch]);

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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label="completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={tasks} /> // Use the tasks from Redux
        ) : (
          <div className="w-full">
            <Table tasks={tasks} /> // Use the tasks from Redux
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
