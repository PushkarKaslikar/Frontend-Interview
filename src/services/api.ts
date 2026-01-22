const API_URL = 'http://localhost:3002';

export type Blog = {
    id: string;
    title: string;
    category: string[];
    description: string;
    date: string;
    readTime?: string;
    coverImage: string;
    content: string;
    author?: {
        name: string;
        role: string;
        avatar: string;
    };
    tags?: string[];
};

export const fetchBlogs = async (): Promise<Blog[]> => {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return response.json();
};

export const fetchBlogById = async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch blog');
    }
    return response.json();
};

export const createBlog = async (blog: Omit<Blog, 'id'>): Promise<Blog> => {
    const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
    });
    if (!response.ok) {
        throw new Error('Failed to create blog');
    }
    return response.json();
};
