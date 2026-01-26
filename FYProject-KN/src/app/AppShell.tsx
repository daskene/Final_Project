import AppRouter from './router';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-800">
        <div className="container mx-auto flex items-center justify-between p-4">
          <a href="#dashboard" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-xl">StoryAI</span>
          </a>
          <nav className="flex items-center gap-6">
            <a href="#dashboard" className="hover:text-indigo-400 transition-colors">
              Home
            </a>
            <a href="#editor" className="hover:text-indigo-400 transition-colors">
              Editor
            </a>
            <a
              href="#auth"
              className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500 transition-colors"
            >
              Sign In
            </a>
          </nav>
        </div>
      </header>
      <main>
        <AppRouter />
      </main>
      <footer className="border-t border-slate-800 mt-20">
        <div className="container mx-auto px-6 py-8 text-center text-slate-400">
          <p>&copy; 2026 StoryAI. Powered by AI and creativity.</p>
        </div>
      </footer>
    </div>
  );
}
