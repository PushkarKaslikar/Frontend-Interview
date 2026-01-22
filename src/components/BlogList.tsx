import { useQuery } from "@tanstack/react-query"
import { fetchBlogs } from "@/services/api"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface BlogListProps {
    onSelectBlog: (id: string) => void;
}

export function BlogList({ onSelectBlog }: BlogListProps) {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    })

    if (isLoading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse space-y-4">
                    <div className="bg-gray-200 dark:bg-neutral-800 rounded-2xl aspect-[4/3]" />
                    <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-3/4" />
                </div>
            ))}
        </div>
    )
    if (error) return <div className="text-center py-20 text-red-500">Failed to load stories.</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {blogs?.map((blog, index) => (
                <motion.div
                    layoutId={`card-${blog.id}`}
                    key={blog.id}
                    onClick={() => onSelectBlog(blog.id)}
                    className="group cursor-pointer flex flex-col gap-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    {/* Image Card */}
                    <motion.div
                        layoutId={`image-${blog.id}`}
                        className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 dark:bg-neutral-800 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2"
                    >
                        <img
                            src={blog.coverImage || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=60"}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                        {/* Floating Category Tag */}
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-black dark:text-white">
                                {blog.category?.[0] || 'Story'}
                            </span>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-2 px-2">
                        <motion.h3
                            layoutId={`title-${blog.id}`}
                            className="text-xl font-bold leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                        >
                            {blog.title}
                        </motion.h3>
                        <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed">
                            {blog.description}
                        </p>
                        <div className="pt-2 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                            Read Story <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
