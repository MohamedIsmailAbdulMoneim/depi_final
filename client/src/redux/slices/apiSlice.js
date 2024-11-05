import { createSlice } from "@reduxjs/toolkit";
import { createTask, createActivity, fetchDashboardDetails, fetchTasks, fetchTask, duplicateTask, createSubTask, updateTask, trashTask } from "../../APIS/Apis";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  successMessage: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.successMessage = "Task created successfully!";
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.successMessage = "Task created successfully!";
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchDashboardDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchDashboardDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(duplicateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(duplicateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.successMessage = "Task duplicated successfully!";
      })
      .addCase(duplicateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createSubTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubTask.fulfilled, (state, action) => {
        state.loading = false;
        const createdSubTask = action.payload;
        const index = state.tasks.findIndex((task) => task._id === createdSubTask._id);
        if (index !== -1) {
          state.tasks[index] = createdSubTask;
        }
        state.successMessage = "Sub task created successfully!";
      })
      .addCase(createSubTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
        state.successMessage = "Task updated successfully!";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(trashTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trashTask.fulfilled, (state, action) => {
        state.loading = false;
        const trashedTaskId = action.payload._id;
        state.tasks = state.tasks.filter((task) => task._id !== trashedTaskId);
        state.successMessage = "Task trashed successfully!";
      })
      .addCase(trashTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = taskSlice.actions;
export default taskSlice.reducer;
