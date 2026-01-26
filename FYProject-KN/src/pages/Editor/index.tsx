import { useEffect, useMemo, useRef, useState } from 'react';

export default function Editor() {
  const [title, setTitle] = useState('The Midnight Library');
  const [prompt, setPrompt] = useState('A traveler enters a library that exists between worlds...');
  const [story, setStory] = useState(
    'The door sighed open, spilling a hush of dust and star-lit air. Shelves spiraled upward, and every book whispered a different version of his life. Tonight, he had to choose one to step into.',
  );
  const [notes, setNotes] = useState('Track branches, character motives, and rules for the world.');
  const [font, setFont] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState('');
  const storyRef = useRef<HTMLTextAreaElement | null>(null);

  const wordCount = useMemo(() => story.trim().split(/\s+/).filter(Boolean).length, [story]);
  const charCount = story.length;

  const handleSave = () => {
    setStatus('Draft saved locally. Connect storage to persist.');
    setTimeout(() => setStatus(''), 3000);
  };

  const handleNewScene = () => {
    setStory('');
    setPrompt('');
    setTitle('Untitled Scene');
    setStatus('New scene started');
    setTimeout(() => setStatus(''), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setStatus('Copied to clipboard');
      setTimeout(() => setStatus(''), 2000);
    } catch (err) {
      setStatus('Copy failed.');
    }
  };

  const applyFormat = (left: string, right: string = left) => {
    const el = storyRef.current;
    if (!el) return;
    const { selectionStart, selectionEnd, value } = el;
    const before = value.slice(0, selectionStart);
    const selected = value.slice(selectionStart, selectionEnd) || 'text';
    const after = value.slice(selectionEnd);
    const next = `${before}${left}${selected}${right}${after}`;
    setStory(next);
    requestAnimationFrame(() => {
      const pos = selectionStart + left.length + selected.length + right.length;
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  };

  const togglePreview = () => setShowPreview((p) => !p);

  const fontClass = useMemo(() => {
    if (font === 'mono') return 'font-mono';
    if (font === 'sans') return 'font-sans';
    return 'font-serif';
  }, [font]);

  // Keyboard shortcuts for formatting: Ctrl+B, Ctrl+I
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!storyRef.current) return;
      if (document.activeElement !== storyRef.current) return;
      if (!e.ctrlKey) return;

      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        applyFormat('**');
      }
      if (e.key.toLowerCase() === 'i') {
        e.preventDefault();
        applyFormat('*');
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Interactive Fiction Editor</p>
            <h1 className="text-2xl font-bold">Story Workspace</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleNewScene}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 transition-colors"
            >
              New Scene
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors font-semibold"
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 grid lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Title</p>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-700 focus:border-indigo-500 focus:outline-none text-2xl font-semibold py-1"
                  placeholder="Untitled Scene"
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>{wordCount} words</span>
                <span className="text-slate-600">|</span>
                <span>{charCount} chars</span>
              </div>
            </div>

            <label className="block text-sm text-slate-400 mb-2">AI Prompt / Scene Intent</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors min-h-[90px]"
              placeholder="Describe tone, pacing, conflict, or branch logic..."
            />

            <label className="block text-sm text-slate-400 mt-6 mb-2">Story Text</label>
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
              <ToolbarButton label="B" onClick={() => applyFormat('**')} />
              <ToolbarButton label="I" onClick={() => applyFormat('*')} />
              <ToolbarButton label="Code" onClick={() => applyFormat('`')} />
              <ToolbarButton label="H1" onClick={() => applyFormat('# ', '')} />
              <ToolbarButton label="H2" onClick={() => applyFormat('## ', '')} />
              <ToolbarButton label="Quote" onClick={() => applyFormat('> ', '')} />
              <ToolbarButton label="Bullet" onClick={() => applyFormat('- ', '')} />
              <select
                value={font}
                onChange={(e) => setFont(e.target.value as typeof font)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="serif">Serif</option>
                <option value="sans">Sans</option>
                <option value="mono">Mono</option>
              </select>
              <button
                type="button"
                onClick={togglePreview}
                className="ml-auto px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 transition-colors"
              >
                {showPreview ? 'Edit' : 'Playtest'}
              </button>
            </div>

            {!showPreview && (
              <textarea
                ref={storyRef}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className={`w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-4 focus:outline-none focus:border-indigo-500 transition-colors min-h-[340px] leading-7 ${fontClass}`}
                placeholder="Write your scene here..."
              />
            )}

            {showPreview && (
              <div className={`w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-4 min-h-[340px] leading-7 prose prose-invert prose-headings:text-indigo-200 prose-strong:text-white prose-em:text-indigo-100 ${fontClass}`}>
                <RenderMarkdown text={story} />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 transition-colors"
              >
                Copy
              </button>
              <button
                onClick={() => setStory((s) => s + '\n\n[ Add a choice... ]')}
                className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 transition-colors"
              >
                Insert Choice Marker
              </button>
              <span className="text-slate-500">Auto-save & AI hookup coming next.</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Panel title="Scene Notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors min-h-[140px]"
                placeholder="Constraints, NPC goals, lore reminders..."
              />
            </Panel>
            <Panel title="Session Status">
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Draft locally cached (not yet synced)</li>
                <li>• Username-based auth active</li>
                <li>• AI generation endpoint: not wired</li>
              </ul>
              {status && <p className="mt-3 text-xs text-indigo-300">{status}</p>}
            </Panel>
          </div>
        </div>

        <aside className="space-y-4">
          <Panel title="Scenes">
            <div className="space-y-2 text-sm text-slate-300">
              <ScenePill label="Opening" active />
              <ScenePill label="Confrontation" />
              <ScenePill label="Branch: Escape" />
              <ScenePill label="Branch: Surrender" />
            </div>
          </Panel>

          <Panel title="Characters">
            <div className="space-y-3 text-sm text-slate-300">
              <CharacterCard name="Lyra" role="Archivist" note="Knows every ending." />
              <CharacterCard name="Cassian" role="Traveler" note="Owes a debt to the library." />
              <CharacterCard name="The Curator" role="AI" note="Offers bargains, hides costs." />
            </div>
          </Panel>

          <Panel title="Branching Seeds">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Choice: Reveal the true ledger</li>
              <li>• Choice: Burn a book to escape</li>
              <li>• Timer: Library closes in 8 minutes</li>
            </ul>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</h3>
        <span className="text-slate-600 text-xs">UI</span>
      </div>
      {children}
    </div>
  );
}

function ScenePill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg border ${
        active ? 'border-indigo-500 bg-indigo-500/10 text-indigo-200' : 'border-slate-800 bg-slate-900'
      }`}
    >
      <span>{label}</span>
      <span className="text-xs text-slate-500">✦</span>
    </div>
  );
}

function CharacterCard({ name, role, note }: { name: string; role: string; note: string }) {
  return (
    <div className="border border-slate-800 rounded-xl p-3 bg-slate-950/60">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
        <span className="text-indigo-300 text-xs">NPC</span>
      </div>
      <p className="text-xs text-slate-400 mt-2">{note}</p>
    </div>
  );
}

function ToolbarButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 transition-colors text-xs font-semibold"
    >
      {label}
    </button>
  );
}

function RenderMarkdown({ text }: { text: string }) {
  const html = useMemo(() => toHtml(text), [text]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function toHtml(raw: string): string {
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let out = escape(raw);

  // headings
  out = out.replace(/^###\s(.+)$/gim, '<h3>$1</h3>');
  out = out.replace(/^##\s(.+)$/gim, '<h2>$1</h2>');
  out = out.replace(/^#\s(.+)$/gim, '<h1>$1</h1>');

  // bold / italic / code
  out = out.replace(/\*\*(.+?)\*\*/gim, '<strong>$1</strong>');
  out = out.replace(/\*(.+?)\*/gim, '<em>$1</em>');
  out = out.replace(/`(.+?)`/gim, '<code>$1</code>');

  // blockquote
  out = out.replace(/^>\s(.+)$/gim, '<blockquote>$1</blockquote>');

  // lists
  out = out.replace(/^(?:-\s.+(?:\n|$))+?/gim, (match) => {
    const items = match
      .trim()
      .split(/\n/)
      .map((line) => line.replace(/^-\s/, '').trim())
      .map((li) => `<li>${li}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  // paragraphs
  out = out
    .split(/\n\n+/)
    .map((block) => {
      if (/^<h[1-3]>|^<blockquote>|^<ul>/.test(block)) return block;
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');

  return out;
}
