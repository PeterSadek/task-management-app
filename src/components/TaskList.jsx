import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../features/taskSlice";

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
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div>
                <p>{task.title}</p>
                {task.description && <p>{task.description}</p>}
                <p>State: {task.state}</p>
              </div>
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
