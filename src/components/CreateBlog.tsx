import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "@/services/api"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

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
        <div className="h-full overflow-y-auto bg-white dark:bg-neutral-950">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Write a Story</h1>
                    <p className="text-neutral-500">Share your thoughts with the world.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-neutral-500 uppercase text-xs tracking-wider">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter a descriptive title"
                                required
                                value={formData.title}
                                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                className="text-2xl font-bold border-0 border-b border-neutral-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:font-bold placeholder:text-neutral-300 h-14"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-neutral-500 uppercase text-xs tracking-wider">Category</Label>
                                <Input
                                    id="category"
                                    placeholder="e.g. TECHNOLOGY"
                                    required
                                    value={formData.category}
                                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    className="border-0 border-b border-neutral-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black h-10"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverImage" className="text-neutral-500 uppercase text-xs tracking-wider">Cover Image URL</Label>
                                <Input
                                    id="coverImage"
                                    placeholder="https://..."
                                    value={formData.coverImage}
                                    onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                                    className="border-0 border-b border-neutral-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black h-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-neutral-500 uppercase text-xs tracking-wider">Short Description</Label>
                            <Textarea
                                id="description"
                                placeholder="What is this story about?"
                                required
                                value={formData.description}
                                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="resize-none border-0 border-b border-neutral-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black min-h-[80px]"
                            />
                        </div>

                        <div className="space-y-2 pt-4">
                            <Label htmlFor="content" className="text-neutral-500 uppercase text-xs tracking-wider">Story</Label>
                            <Textarea
                                id="content"
                                placeholder="Tell your story..."
                                className="min-h-[400px] font-serif text-lg border-0 focus-visible:ring-0 p-0 resize-y"
                                required
                                value={formData.content}
                                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-neutral-100">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-sm font-medium text-neutral-500 hover:text-black transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
                        >
                            {mutation.isPending ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
