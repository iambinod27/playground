export default function Loading() {
  return (
    <main className="theme-movies film-grain min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="h-3 w-32 bg-panel-raised rounded mb-3" />
        <div className="h-8 w-64 bg-panel-raised rounded mb-6" />
        <div className="h-10 w-full bg-panel-raised rounded mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[2/3] bg-panel-raised rounded-md" />
              <div className="h-3 w-3/4 bg-panel-raised rounded mt-2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}