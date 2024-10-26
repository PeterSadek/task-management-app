import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddTask = () => {
  const schema = yup.object().shape({
    name: yup.string().min(4).max(20).required("Name is required"),
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
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-xl font-semibold mb-3 text-indigo-500">
        Add new task
      </h2>
      <div className="mb-4">
        <input
          {...register("name")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          type="text"
          placeholder="Task name"
        />
        <p>{errors.name?.message}</p>
      </div>
      <div className="mb-4">
        <textarea
          {...register("description")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          placeholder="Task description"
          rows="3"
        ></textarea>
        <p>{errors.description?.message}</p>
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
        <p>{errors.image?.message}</p>
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
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
      >
        Add task
      </button>
    </form>
  );
};

export default AddTask;
