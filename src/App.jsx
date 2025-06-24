import { useState, useEffect } from "react";
import EntryForm from "./components/EntryForm";
import EntryCard from "./components/EntryCard";
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/entries")
      .then(res => setEntries(res.data))
      .catch(err => console.error("Error fetching entries:", err));
  }, []);

  const handleAddOrUpdate = async (entry) => {
    try {
      if (entry.id && entries.some(e => e.id === entry.id)) {
        const res = await axios.put(`http://localhost:8080/entries/${entry.id}`, entry);
        setEntries(entries.map(e => (e.id === entry.id ? res.data : e)));
      } else {
        const res = await axios.post("http://localhost:8080/entries", entry);
        setEntries([res.data, ...entries]);
      }

      setShowForm(false);
      setEditingEntry(null);
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/entries/${id}`);
      setEntries(entries.filter(e => e.id !== id));
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 font-quicksand p-4">
      {/* Header */}
      <nav className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">💖 burn book 2.0 💖</h1>
        <button
          className="bg-white border-2 border-pink-300 text-pink-500 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-pink-100 transition"
          onClick={() => {
            setShowForm(true);
            setEditingEntry(null);
          }}
        >
          + New Entry
        </button>
        <div className="mt-4 bg-pink-300 text-white px-6 py-2 rounded-full text-sm font-medium shadow-inner inline-block">
          💖 Record your daily lives into words and cute things! 💖
        </div>
      </nav>

      {/* Entry Form */}
      {showForm && (
        <EntryForm
          onSubmit={handleAddOrUpdate}
          initialData={editingEntry}
          onCancel={() => {
            setShowForm(false);
            setEditingEntry(null);
          }}
        />
      )}

      {/* Entry List or Empty State */}
      <div className="max-w-2xl mx-auto">
        {entries.length === 0 ? (
          <div className="bg-white p-6 rounded-3xl shadow-lg text-center mt-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">📄 Start Your Journey</h2>
            <br></br>
            <p className="text-gray-500 mb-4">
              Your diary is waiting for your first entry! Click the "New Entry" button to begin documenting your beautiful life.
            </p>
            <button
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-full shadow-md hover:from-pink-500 hover:to-purple-600"
              onClick={() => {
                setShowForm(true);
                setEditingEntry(null);
              }}
            >
              Write Your First Entry
            </button>
          </div>
        ) : (
          entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
