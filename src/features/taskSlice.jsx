import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  status: "All",
};

// Fetch data from api
export const fetchTodo = createAsyncThunk("tasks/fetchTodo", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=4"
  );
  const data = await response.json();

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: "",
    state: task.completed ? "done" : "todo",
    priority: task.priority,
    image: task.image,
  }));
});

//Create a slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  // extrareducers for handling fetched data
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
