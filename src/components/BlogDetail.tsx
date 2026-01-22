import { useQuery } from "@tanstack/react-query"
import { fetchBlogById } from "@/services/api"
import { motion } from "framer-motion"
import { Share2, Clock, CalendarDays, User, ThumbsUp, MessageSquare, X } from "lucide-react"

interface BlogDetailProps {
    id: string | null;
    onBack: () => void;
}

export function BlogDetail({ id, onBack }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    })

    // Placeholder data for smooth animation before load
    const content = blog || { id, title: "Loading...", coverImage: null, date: new Date().toISOString() } as any;

    if (!id) return null

    return (
        <motion.div
            className="relative bg-white dark:bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl min-h-[80vh] mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId={`card-${id}`}
        >
            {/* Close Button */}
            <button
                onClick={onBack}
                className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Hero Section with Shared Layout ID */}
            <div className="relative h-[50vh] md:h-[60vh]">
                <motion.div
                    layoutId={`image-${id}`}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={content.coverImage || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=60"}
                        alt={content.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.h1
                            layoutId={`title-${id}`}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight"
                        >
                            {content.title}
                        </motion.h1>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap items-center gap-3">
                            {content.category && (
                                <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                                    {content.category[0]}
                                </span>
                            )}
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-medium flex items-center gap-2">
                                <Clock className="w-3 h-3" /> {content.readTime || '5 min read'}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Body Content */}
            <div className="max-w-4xl mx-auto px-8 py-16">
                {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-full" />
                        <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-full" />
                        <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-2/3" />
                    </div>
                ) : error ? (
                    <div className="text-red-500">Error loading content</div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Author & Actions Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-b border-gray-100 dark:border-neutral-800 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                                    {blog?.author?.avatar ? <img src={blog.author.avatar} alt={blog.author.name} /> : <User className="w-6 h-6 text-gray-400" />}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{blog?.author?.name || 'Anonymous'}</p>
                                    <p className="text-sm text-gray-500">{blog?.author?.role || 'Contributor'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors text-sm font-medium">
                                    <ThumbsUp className="w-4 h-4" /> Like
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors text-sm font-medium">
                                    <MessageSquare className="w-4 h-4" /> Comment
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 transition-colors text-sm font-medium">
                                    <Share2 className="w-4 h-4" /> Share
                                </button>
                            </div>
                        </div>

                        {/* Text Content */}
                        <article className="prose prose-lg dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight 
                            prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-8
                            prose-img:rounded-2xl prose-img:shadow-xl">
                            <div className="whitespace-pre-wrap font-serif text-xl">
                                {blog?.content}
                            </div>
                        </article>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
