export default function Loading() {
  return (
    <main className="theme-space min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-3 w-56 bg-panel-raised rounded mb-6" />
        <div className="aspect-video w-full bg-panel-raised rounded-lg border border-line" />
        <div className="h-6 w-2/3 bg-panel-raised rounded mt-6" />
        <div className="h-3 w-full bg-panel-raised rounded mt-4" />
        <div className="h-3 w-5/6 bg-panel-raised rounded mt-2" />
      </div>
    </main>
  );
}