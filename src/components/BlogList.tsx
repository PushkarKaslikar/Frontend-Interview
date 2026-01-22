import { useQuery } from "@tanstack/react-query"
import { fetchBlogs } from "@/services/api"
import { motion } from "framer-motion"

interface BlogListProps {
    onSelectBlog: (id: string) => void;
    selectedId: string | null;
}

export function BlogList({ onSelectBlog, selectedId }: BlogListProps) {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    })

    if (isLoading) return (
        <div className="p-6 space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-neutral-100 dark:bg-neutral-900 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    )
    if (error) return <div className="p-6 text-red-500 text-sm">Error loading stories.</div>

    return (
        <div className="flex-1 overflow-y-auto px-2">
            <div className="space-y-1 py-2">
                {blogs?.map((blog, index) => {
                    const isActive = selectedId === blog.id;
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={blog.id}
                            onClick={() => onSelectBlog(blog.id)}
                            className={`
                                group cursor-pointer p-4 rounded-lg transition-all duration-200
                                ${isActive
                                    ? 'bg-neutral-100 dark:bg-neutral-900'
                                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/50'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-1.5">
                                <span className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
                                    {blog.category?.[0] || 'GENERAL'}
                                </span>
                                <span className="text-[10px] text-neutral-400">
                                    {formatDate(blog.date)}
                                </span>
                            </div>

                            <h3 className={`text-base font-semibold leading-snug mb-1.5 ${isActive ? 'text-black dark:text-white' : 'text-neutral-900 dark:text-neutral-100'}`}>
                                {blog.title}
                            </h3>

                            <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                                {blog.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    )
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
