import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

const EditTask = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    title: yup.string().min(4).max(20).required("Name is required"),
    description: yup.string().min(8).max(50).optional(),
    priority: yup
      .string()
      .oneOf(["Low", "Medium", "High"])
      .required("Priority is required"),
    state: yup
      .string()
      .oneOf(["todo", "doing", "done"])
      .required("State is required"),
    image: yup.mixed().optional(),
  });

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("priority", task.priority);
      setValue("state", task.state);
    }
  }, [task, setValue]);

  return (
    <div>
      {isEditing ? (
        <div className="absolute bg-white p-4 border rounded-md shadow-lg z-10 max-w-sm">
          <h2 className="text-xl font-semibold mb-3 text-indigo-500">
            Edit task
          </h2>
          <div className="mb-4">
            <input
              {...register("title")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              type="text"
              placeholder="Task title"
            />
            <p className="text-red-700">{errors.name?.message}</p>
          </div>
          <div className="mb-4">
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              placeholder="Task description"
              rows="3"
            ></textarea>
            <p className="text-red-700">{errors.description?.message}</p>
          </div>
          <div className="mb-4">
            <label className="px-3 py-2" htmlFor="image">
              Select image
            </label>
            <input
              {...register("image")}
              type="file"
              id="image"
              accept="image/*"
              className="px-3 py-2 border rounded-md"
            />
            <p className="text-red-700">{errors.image?.message}</p>
          </div>
          <div className="mb-4">
            <select
              {...register("state")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            >
              <option value="">Select state</option>
              <option value="todo">todo</option>
              <option value="doing">doing</option>
              <option value="done">done</option>
            </select>
            <p className="text-red-700">{errors.state?.message}</p>
          </div>
          <div className="mb-4">
            <select
              {...register("priority")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <p className="text-red-700">{errors.priority?.message}</p>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className=" bg-indigo-600 text-white py-2 px-2 rounded-md hover:bg-indigo-700"
            >
              Add task
            </button>
            <button
              className=" bg-gray-300 py-2 px-2 rounded-md hover:bg-gray-400"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditTask;
