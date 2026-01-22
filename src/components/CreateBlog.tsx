import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "@/services/api"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { X, ArrowLeft } from "lucide-react"

interface CreateBlogProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CreateBlog({ onSuccess, onCancel }: CreateBlogProps) {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        content: "",
        coverImage: ""
    })

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
            onSuccess()
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate({
            ...formData,
            category: formData.category.split(',').map(c => c.trim().toUpperCase()),
            date: new Date().toISOString(),
        })
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-white dark:bg-black overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 lg:py-28">
                {/* Navigation / Header */}
                <div className="flex items-center justify-between mb-16">
                    <button
                        onClick={onCancel}
                        className="group flex items-center gap-2 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-black dark:group-hover:border-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Cancel</span>
                    </button>

                    <button
                        onClick={() => mutation.mutate({
                            ...formData,
                            category: formData.category.split(',').map(c => c.trim().toUpperCase()),
                            date: new Date().toISOString(),
                        })}
                        disabled={mutation.isPending}
                        className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                    >
                        {mutation.isPending ? 'Publishing...' : 'Publish Story'}
                    </button>
                </div>

                <div className="space-y-12">
                    <div className="relative">
                        <Input
                            placeholder="Title"
                            required
                            value={formData.title}
                            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="text-5xl md:text-7xl font-black border-0 border-l-4 border-transparent focus:border-black dark:focus:border-white rounded-none px-6 py-4 h-auto placeholder:text-neutral-200 dark:placeholder:text-neutral-800 focus-visible:ring-0 transition-colors bg-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                        <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold tracking-widest text-neutral-400">Category</Label>
                            <Input
                                placeholder="TECHNOLOGY"
                                required
                                value={formData.category}
                                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="border-0 border-b border-neutral-200 dark:border-neutral-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="uppercase text-xs font-bold tracking-widest text-neutral-400">Cover Image URL</Label>
                            <Input
                                placeholder="https://..."
                                value={formData.coverImage}
                                onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                                className="border-0 border-b border-neutral-200 dark:border-neutral-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white font-mono"
                            />
                        </div>
                    </div>

                    <div className="px-6">
                        <Textarea
                            placeholder="Tell your story..."
                            className="min-h-[50vh] text-xl md:text-2xl leading-relaxed text-neutral-800 dark:text-neutral-200 border-0 focus-visible:ring-0 p-0 resize-none font-serif placeholder:font-sans placeholder:text-neutral-300"
                            required
                            value={formData.content}
                            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        />
                    </div>
                </div>

            </div>
        </motion.div>
    )
}
