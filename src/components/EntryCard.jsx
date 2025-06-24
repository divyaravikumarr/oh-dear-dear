import { FaEdit, FaTrash } from "react-icons/fa";

function EntryCard({ entry, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4 font-quicksand">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-pink-600">{entry.title}</h2>
          <p className="text-gray-400 text-sm">{entry.date}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(entry)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-red-400 hover:text-red-600"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="mt-3 text-gray-700 whitespace-pre-wrap">{entry.content}</p>
    </div>
  );
}

export default EntryCard;
