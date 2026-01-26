export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Craft Your Story with AI
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          Transform your ideas into captivating narratives. Let AI be your creative partner
          in building immersive, interactive stories.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#editor"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-colors"
          >
            Start Writing
          </a>
          <a
            href="#auth"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold text-lg transition-colors"
          >
            Sign In
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="✨"
            title="AI-Powered Writing"
            description="Get intelligent suggestions and auto-complete your story with advanced AI assistance."
          />
          <FeatureCard
            icon="📖"
            title="Interactive Stories"
            description="Create branching narratives with multiple paths and endings for your readers."
          />
          <FeatureCard
            icon="☁️"
            title="Cloud Sync"
            description="Your stories are automatically saved and synced across all your devices."
          />
        </div>
      </section>

      {/* Recent Stories Placeholder */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Your Recent Stories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StoryCard
            title="Untitled Story"
            preview="Start your first story..."
            lastEdited="Just now"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-indigo-500 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

function StoryCard({ title, preview, lastEdited }: { title: string; preview: string; lastEdited: string }) {
  return (
    <a
      href="#editor"
      className="block bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-indigo-500 transition-colors"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 mb-4 line-clamp-2">{preview}</p>
      <p className="text-sm text-slate-500">Last edited {lastEdited}</p>
    </a>
  );
}
