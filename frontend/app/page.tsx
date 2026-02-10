import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">
          Personal Notes & Bookmark Manager
        </h1>

        <div className="space-x-4">
          <Link
            href="/bookmarks"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Bookmarks
          </Link>

          <Link
            href="/notes"
            className="border px-4 py-2 rounded"
          >
            Notes
          </Link>
        </div>
      </div>
    </div>
  );
}
