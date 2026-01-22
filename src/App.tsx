import { useState } from 'react'
import { BlogList } from '@/components/BlogList'
import { BlogDetail } from '@/components/BlogDetail'
import { CreateBlog } from '@/components/CreateBlog'
import { Plus, Command } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id)
    setIsCreating(false)
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setSelectedBlogId(null)
  }

  const handleCancelCreate = () => {
    setIsCreating(false)
  }

  const handleCreateSuccess = () => {
    setIsCreating(false)
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-50 dark:bg-neutral-950 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-hidden">
      {/* Minimal Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-none h-14 flex items-center justify-between px-6 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md z-40 sticky top-0"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-black dark:bg-white rounded-full flex items-center justify-center">
             <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
          </div>
          <span className="font-bold text-sm tracking-tight">MONK</span>
        </div>

        <div className="flex items-center gap-4">
           {/* Search Placeholder */}
           <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1.5 rounded-md">
              <Command className="w-3 h-3" />
              <span>K</span>
           </div>

          <button
            onClick={handleCreateNew}
            disabled={isCreating}
            className="group flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span className="hidden sm:inline">New Post</span>
          </button>
        </div>
      </motion.header>

      {/* Main Layout */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className="max-w-[1600px] w-full mx-auto flex h-full">

          {/* Left Panel - Blog List */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className={`w-full md:w-[450px] flex-none border-r border-neutral-200/50 dark:border-neutral-800/50 flex flex-col bg-white/30 dark:bg-neutral-950/30 backdrop-blur-sm
               ${selectedBlogId || isCreating ? 'hidden md:flex' : 'flex'}`}
          >
            <div className="p-6 pb-2">
              <h1 className="text-2xl font-bold tracking-tight">Stories</h1>
              <p className="text-neutral-500 text-sm mt-1">Explore the latest thoughts and ideas.</p>
            </div>
            <BlogList onSelectBlog={handleSelectBlog} selectedId={selectedBlogId} />
          </motion.div>

          {/* Right Panel - Content */}
          <div className={`flex-1 overflow-hidden bg-white dark:bg-neutral-950 relative
             ${!selectedBlogId && !isCreating ? 'hidden md:block' : 'block'}`}
          >
             <AnimatePresence mode="wait">
                {isCreating ? (
                  <motion.div
                    key="create"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <CreateBlog onSuccess={handleCreateSuccess} onCancel={handleCancelCreate} />
                  </motion.div>
                ) : selectedBlogId ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                     className="h-full"
                  >
                    <BlogDetail id={selectedBlogId} />
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-400 p-8 text-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="max-w-md"
                    >
                      <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <div className="w-6 h-6 border-2 border-neutral-300 dark:border-neutral-700 rounded-full" />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">Select a story to read</h3>
                      <p>Or click "New Post" to share your own ideas with the community.</p>
                    </motion.div>
                  </div>
                )}
             </AnimatePresence>

             {/* Mobile Back Button Overlay */}
             {(selectedBlogId || isCreating) && (
                <div className="md:hidden fixed bottom-6 right-6 z-50">
                  <button
                    onClick={() => { setSelectedBlogId(null); setIsCreating(false); }}
                    className="bg-black/90 dark:bg-white/90 text-white dark:text-black px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur text-sm flex items-center gap-2"
                  >
                    Back to list
                  </button>
                </div>
             )}
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
