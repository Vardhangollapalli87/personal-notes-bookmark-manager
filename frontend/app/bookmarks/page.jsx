


// "use client";

// import { useEffect, useState } from "react";

// const BookmarksPage = () => {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [search, setSearch] = useState("");
//   const [tags, setTags] = useState("");
//   const [bookmarks, setBookmarks] = useState([]);

//   // Fetch bookmarks with search & tags
//   const fetchBookmarks = async () => {
//     let apiUrl = `http://localhost:5000/api/bookmarks?q=${search}`;

//     if (tags) {
//       apiUrl += `&tags=${tags}`;
//     }

//     const res = await fetch(apiUrl);
//     const data = await res.json();
//     setBookmarks(data);
//   };

//   useEffect(() => {
//     fetchBookmarks();
//   }, [search, tags]);

//   // Add bookmark
//   const addBookmark = async () => {
//     if (!title || !url) {
//       alert("Title and URL are required");
//       return;
//     }

//     await fetch("http://localhost:5000/api/bookmarks", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         url,
//         tags: tags ? tags.split(",") : [],
//       }),
//     });

//     setTitle("");
//     setUrl("");
//     fetchBookmarks();
//   };

//   // Delete bookmark
//   const deleteBookmark = async (id) => {
//     await fetch(`http://localhost:5000/api/bookmarks/${id}`, {
//       method: "DELETE",
//     });

//     fetchBookmarks();
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>

//       {/* Search */}
//       <input
//         className="border p-2 w-full mb-2"
//         placeholder="Search bookmarks..."
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

//       {/* Add Bookmark */}
//       <input
//         className="border p-2 w-full mb-2"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <input
//         className="border p-2 w-full mb-2"
//         placeholder="URL"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//       />

//       <button
//         onClick={addBookmark}
//         className="bg-black text-white px-4 py-2 mb-6"
//       >
//         Add Bookmark
//       </button>

//       {/* Bookmark List */}
//       <ul className="space-y-2">
//         {bookmarks.map((b) => (
//           <li
//             key={b._id}
//             className="border p-2 flex justify-between items-center"
//           >
//             <div>
//               <a
//                 href={b.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline font-medium"
//               >
//                 {b.title}
//               </a>

//               {b.tags && b.tags.length > 0 && (
//                 <div className="text-sm text-gray-500">
//                   Tags: {b.tags.join(", ")}
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={() => deleteBookmark(b._id)}
//               className="text-red-600 text-sm"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BookmarksPage;


"use client";

import { useEffect, useState } from "react";

const BookmarksPage = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks with search & tags
  const fetchBookmarks = async () => {
    let apiUrl = `http://localhost:5000/api/bookmarks?q=${search}`;

    if (tags) {
      apiUrl += `&tags=${tags}`;
    }

    const res = await fetch(apiUrl);
    const data = await res.json();

    // Show favorites first
    setBookmarks(data.sort((a, b) => b.favorite - a.favorite));
  };

  useEffect(() => {
    fetchBookmarks();
  }, [search, tags]);

  // Add bookmark
  const addBookmark = async () => {
    if (!title || !url) {
      alert("Title and URL are required");
      return;
    }

    await fetch("http://localhost:5000/api/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        url,
        tags: tags ? tags.split(",") : [],
      }),
    });

    setTitle("");
    setUrl("");
    fetchBookmarks();
  };

  // Delete bookmark
  const deleteBookmark = async (id) => {
    await fetch(`http://localhost:5000/api/bookmarks/${id}`, {
      method: "DELETE",
    });

    fetchBookmarks();
  };

  // Toggle favorite
  const toggleFavorite = async (id, currentValue) => {
    await fetch(`http://localhost:5000/api/bookmarks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: !currentValue }),
    });

    fetchBookmarks();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Bookmark Manager
        </h1>

        {/* Search */}
        <input
          className="border rounded p-2 w-full mb-3 focus:outline-none focus:ring"
          placeholder="Search bookmarks..."
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

        {/* Add Bookmark */}
        <div className="space-y-3 mb-6">
          <input
            className="border rounded p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border rounded p-2 w-full"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={addBookmark}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Add Bookmark
          </button>
        </div>

        {/* Bookmark List */}
        <ul className="space-y-3">
          {bookmarks.length === 0 && (
            <p className="text-center text-gray-500">
              No bookmarks found
            </p>
          )}

          {bookmarks.map((b) => (
            <li
              key={b._id}
              className="border rounded p-4 flex justify-between items-start hover:shadow transition"
            >
              <div>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold underline"
                >
                  {b.title}
                </a>

                {b.tags && b.tags.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Tags: {b.tags.join(", ")}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(b._id, b.favorite)}
                  className="text-xl"
                  title="Toggle Favorite"
                >
                  {b.favorite ? "⭐" : "☆"}
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteBookmark(b._id)}
                  className="text-red-600 text-sm hover:underline"
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

export default BookmarksPage;

