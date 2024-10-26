import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../features/taskSlice";
import placeholder from "../assets/placeholder.png";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error while loading tasks.{error}</p>;
  }

  return (
    <div>
      <div>
        <h2>Tasks</h2>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-grey-50 p-4 rounded-md shadow-sm flex justify-between items-center flex-wrap"
            >
              <div>
                <div className="flex items-center">
                  <img
                    src={
                      task.image ? URL.createObjectURL(task.image) : placeholder
                    }
                    alt="Task image"
                    width="48"
                  />
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
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
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
