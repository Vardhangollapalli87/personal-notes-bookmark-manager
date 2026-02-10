// "use client";

// import { useEffect, useState } from "react";

// const NotesPage = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [search, setSearch] = useState("");
//   const [tags, setTags] = useState("");
//   const [notes, setNotes] = useState([]);

//   // Fetch notes with search & tags
//   const fetchNotes = async () => {
//     let apiUrl = `http://localhost:5000/api/notes?q=${search}`;

//     if (tags) {
//       apiUrl += `&tags=${tags}`;
//     }

//     const res = await fetch(apiUrl);
//     const data = await res.json();
//     setNotes(data);
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, [search, tags]);

//   // Add note
//   const addNote = async () => {
//     if (!title || !content) {
//       alert("Title and content are required");
//       return;
//     }

//     await fetch("http://localhost:5000/api/notes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         content,
//         tags: tags ? tags.split(",") : [],
//       }),
//     });

//     setTitle("");
//     setContent("");
//     fetchNotes();
//   };

//   // Delete note
//   const deleteNote = async (id) => {
//     await fetch(`http://localhost:5000/api/notes/${id}`, {
//       method: "DELETE",
//     });

//     fetchNotes();
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Notes</h1>

//       {/* Search */}
//       <input
//         className="border p-2 w-full mb-2"
//         placeholder="Search notes..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Tag filter */}
//       <input
//         className="border p-2 w-full mb-4"
//         placeholder="Filter by tags (comma separated)"
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//       />

//       {/* Add Note */}
//       <input
//         className="border p-2 w-full mb-2"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         className="border p-2 w-full mb-2"
//         placeholder="Content"
//         rows={4}
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />

//       <button
//         onClick={addNote}
//         className="bg-black text-white px-4 py-2 mb-6"
//       >
//         Add Note
//       </button>

//       {/* Notes List */}
//       <ul className="space-y-3">
//         {notes.map((note) => (
//           <li key={note._id} className="border p-3">
//             <h2 className="font-semibold">{note.title}</h2>
//             <p className="text-sm text-gray-700 mt-1">
//               {note.content}
//             </p>

//             {note.tags && note.tags.length > 0 && (
//               <div className="text-xs text-gray-500 mt-1">
//                 Tags: {note.tags.join(", ")}
//               </div>
//             )}

//             <button
//               onClick={() => deleteNote(note._id)}
//               className="text-red-600 text-sm mt-2"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotesPage;


"use client";

import { useEffect, useState } from "react";

const NotesPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState([]);

  // Fetch notes with search & tags
  const fetchNotes = async () => {
    let apiUrl = `http://localhost:5000/api/notes?q=${search}`;

    if (tags) {
      apiUrl += `&tags=${tags}`;
    }

    const res = await fetch(apiUrl);
    const data = await res.json();

    // Show favorites first
    setNotes(data.sort((a, b) => b.favorite - a.favorite));
  };

  useEffect(() => {
    fetchNotes();
  }, [search, tags]);

  // Add note
  const addNote = async () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags: tags ? tags.split(",") : [],
      }),
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  // Delete note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
    });

    fetchNotes();
  };

  // Toggle favorite
  const toggleFavorite = async (id, currentValue) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: !currentValue }),
    });

    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Notes
        </h1>

        {/* Search */}
        <input
          className="border rounded p-2 w-full mb-3 focus:outline-none focus:ring"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tag filter */}
        <input
          className="border rounded p-2 w-full mb-5 focus:outline-none focus:ring"
          placeholder="Filter by tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Add Note */}
        <div className="space-y-3 mb-6">
          <input
            className="border rounded p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border rounded p-2 w-full"
            placeholder="Content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={addNote}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Add Note
          </button>
        </div>

        {/* Notes List */}
        <ul className="space-y-3">
          {notes.length === 0 && (
            <p className="text-center text-gray-500">
              No notes found
            </p>
          )}

          {notes.map((note) => (
            <li
              key={note._id}
              className="border rounded p-4 hover:shadow transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">
                    {note.title}
                  </h2>

                  <p className="text-sm text-gray-700 mt-1">
                    {note.content}
                  </p>

                  {note.tags && note.tags.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Tags: {note.tags.join(", ")}
                    </div>
                  )}
                </div>

                {/* Favorite */}
                <button
                  onClick={() =>
                    toggleFavorite(note._id, note.favorite)
                  }
                  className="text-xl"
                  title="Toggle Favorite"
                >
                  {note.favorite ? "⭐" : "☆"}
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteNote(note._id)}
                className="text-red-600 text-sm mt-3 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotesPage;
