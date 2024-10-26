const AddTask = () => {
  return (
    <form className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-indigo-500">
        Add new task
      </h2>
      <div className="mb-4">
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          type="text"
          placeholder="Task name"
        />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          placeholder="Task description"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="px-3 py-2" htmlFor="image">
          Select image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2">
          <option>Select state</option>
          <option value="todo">todo</option>
          <option value="doing">doing</option>
          <option value="done">done</option>
        </select>
      </div>
      <div className="mb-4">
        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2">
          <option>Select priority</option>
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
