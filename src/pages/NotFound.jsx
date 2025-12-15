export default function NotFound() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-[var(--fg)]">
      <h1 className="text-7xl font-light">404</h1>
      <p className="opacity-70 mt-3">NOT FOUND</p>
      <a
        href="/"
        className="mt-6 underline opacity-80 hover:opacity-100 transition"
      >
        Home
      </a>
    </div>
  );
}
