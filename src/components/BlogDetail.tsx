import { useQuery } from "@tanstack/react-query"
import { fetchBlogById } from "@/services/api"
import { motion } from "framer-motion"
import { Share2, Clock, CalendarDays, User, ThumbsUp, MessageSquare } from "lucide-react"

interface BlogDetailProps {
    id: string | null;
}

export function BlogDetail({ id }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    })

    if (!id) return null

    if (isLoading) return (
        <div className="h-full flex flex-col justify-center items-center gap-4">
            <div className="w-10 h-10 border-4 border-neutral-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-neutral-400 text-sm">Loading story...</p>
        </div>
    )
    if (error) return <div className="h-full flex items-center justify-center text-red-500">Error loading blog</div>
    if (!blog) return <div className="h-full flex items-center justify-center">Blog not found</div>

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full overflow-y-auto bg-white dark:bg-neutral-950"
        >
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                {/* Header */}
                <div className="mb-8 md:mb-12 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 uppercase tracking-widest">
                        <span>{blog.category?.[0] || 'General'}</span>
                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {blog.readTime || '5 min read'}
                        </span>
                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <CalendarDays className="w-3 h-3" />
                            {new Date(blog.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-neutral-50 tracking-tight leading-[1.1]">
                        {blog.title}
                    </h1>


                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                        {blog.author ? (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                                    {blog.author.avatar ? <img src={blog.author.avatar} alt={blog.author.name} /> : <User className="w-5 h-5 text-neutral-400" />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-900 dark:text-white leading-none">{blog.author.name}</p>
                                    <p className="text-xs text-neutral-500 mt-1">{blog.author.role || 'Author'}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                    <User className="w-5 h-5 text-neutral-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-900 dark:text-white leading-none">Anonymous</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="hidden sm:inline">Like</span>
                            </button>
                            <button className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                <span className="hidden sm:inline">Comment</span>
                            </button>
                            <button className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                                <Share2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Share</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden mb-12 bg-neutral-100 aspect-video relative">
                    <img
                        src={blog.coverImage || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=60"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <article className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight 
                    prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-p:leading-8
                    prose-a:text-black dark:prose-a:text-white prose-a:no-underline prose-a:border-b prose-a:border-neutral-200 hover:prose-a:border-black transition-colors">
                    <div className="whitespace-pre-wrap font-serif text-xl">
                        {blog.content}
                    </div>
                </article>
            </div>
        </motion.div>
    )
}
