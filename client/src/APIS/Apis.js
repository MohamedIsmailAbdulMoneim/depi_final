import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api";

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    console.log(taskData);

    try {
      const response = await fetch(`${API_URL}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not create task");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createActivity = createAsyncThunk(
  "tasks/createActivity",
  async (obj, { rejectWithValue }) => {
    const { taskId, ...taskData } = obj
    try {
      const response = await fetch(`${API_URL}/task/activity/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not create task activity");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchDashboardDetails = createAsyncThunk(
  "tasks/fetchDashboardDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/dashboard`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not fetch tasks");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not fetch tasks");
      return data.tasks;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not fetch task");
      return data.tasks;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const duplicateTask = createAsyncThunk(
  "tasks/duplicateTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/duplicate/${taskId}`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not duplicate task");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/update/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not update task");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const createSubTask = createAsyncThunk(
  "tasks/createSubTask",
  async ({ taskId, taskData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/create-subtask/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not creat sub task");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const trashTask = createAsyncThunk(
  "tasks/trashTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`, {
        method: "PUT",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not trash task");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8800/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error("user not found")
      } else {

        return response;

      }

    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);