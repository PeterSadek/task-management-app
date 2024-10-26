import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTodo, setFilter } from "../features/taskSlice";
import placeholder from "../assets/placeholder.png";
import EditTask from "./EditTask";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const filter = useSelector((state) => state.tasks.filter);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  const filteredTasks = tasks.filter((task) => {
    const stateMatch = filter.state ? task.state === filter.state : true;
    const priorityMatch = filter.priority
      ? task.priority === filter.priority
      : true;
    const searchMatch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return stateMatch && priorityMatch && searchMatch;
  });

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error while loading tasks: {error}</p>;
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl text-indigo-600">Tasks</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by task name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-md p-2"
          />
          <select
            name="state"
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            <option value="">All states</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <select
            name="priority"
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="bg-grey-50 p-4 rounded-md shadow-sm flex justify-between items-center flex-wrap"
            >
              <div>
                <div className="flex items-center">
                  {task.image ? (
                    <img
                      src={task.image}
                      alt={task.title}
                      width="48"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <img src={placeholder} width="48" alt="placeholder" />
                  )}
                  <h3 className="text-lg font-medium text-gray-800">
                    {task.title}
                  </h3>
                </div>
                {task.description && (
                  <p className="text-gray-600">{task.description}</p>
                )}
                <p className="mt-1 text-sm font-semibold">
                  State: <span className="italic underline">{task.state}</span>
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Priority:{" "}
                  <span className="italic underline">
                    {task.priority ? task.priority : "Low"}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2 mt-2">
                <EditTask task={task} />
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
