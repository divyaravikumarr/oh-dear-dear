import { useState } from "react";

function EntryForm({ onSubmit, initialData, onCancel }) {
  const safeData = initialData || {};

  const [title, setTitle] = useState(safeData.title || "");
  const [content, setContent] = useState(safeData.content || "");
  const [date, setDate] = useState(safeData.date || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !date) {
      alert("Please fill in all fields ✨");
      return;
    }

    const newEntry = {
      id: safeData.id, // only if editing
      title,
      content,
      date, // must be in 'YYYY-MM-DD' format
    };

    onSubmit(newEntry);
    setTitle("");
    setContent("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 shadow-md mb-6 font-quicksand max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-3 text-pink-500">
        {safeData.id ? "Edit Entry" : "New Entry"} 📝
      </h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <textarea
        placeholder="Write your thoughts..."
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500"
        >
          Save Entry
        </button>
      </div>
    </form>
  );
}

export default EntryForm;
