import { useState } from 'react'
import { BlogList } from '@/components/BlogList'
import { BlogDetail } from '@/components/BlogDetail'
import { CreateBlog } from '@/components/CreateBlog'
import { Plus, Command, LayoutGrid } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Handlers for navigation
  const handleSelectBlog = (id: string) => setSelectedBlogId(id)
  const handleBackToGrid = () => {
    setSelectedBlogId(null)
    setIsCreating(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 font-sans selection:bg-indigo-500 selection:text-white pb-20">

      {/* Floating Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-6 inset-x-0 mx-auto max-w-6xl z-50 px-4 pointer-events-none"
      >
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl rounded-2xl p-3 pl-6 flex items-center justify-between pointer-events-auto">

          {/* Logo Section */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleBackToGrid}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6" /><path d="M22 16a6 6 0 0 1-12 0v-3a6 6 0 0 0-12 0v3" /></svg>
            </div>
            <span className="font-black text-xl tracking-tighter">CA MONK</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
            <button onClick={handleBackToGrid} className="text-black dark:text-white hover:text-indigo-600 transition-colors">Home</button>
            <button className="hover:text-black dark:hover:text-white transition-colors">Events</button>
            <button className="hover:text-black dark:hover:text-white transition-colors">Mentorship</button>
            <button className="hover:text-black dark:hover:text-white transition-colors">Community</button>
          </div>

          {/* Actions */}
          <button
            onClick={() => setIsCreating(true)}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-80 transition-all active:scale-95 flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Create Post</span>
          </button>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <main className="pt-28 px-4 md:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {isCreating ? (
            <CreateBlog key="create" onCancel={handleBackToGrid} onSuccess={handleBackToGrid} />
          ) : selectedBlogId ? (
            <BlogDetail key="detail" id={selectedBlogId} onBack={handleBackToGrid} />
          ) : (
            <BlogList key="list" onSelectBlog={handleSelectBlog} />
          )}
        </AnimatePresence>
      </main>

    </div>
  )
}

export default App
