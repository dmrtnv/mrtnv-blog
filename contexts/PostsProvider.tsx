'use client';

import PostType from '@/types/PostType';
import axios from '@/lib/axios';
import React, { useContext, createContext, useState } from 'react';
import { z } from 'zod';

const PostSchema = z.array(
  z.object({
    text: z.string(),
    id: z.number(),
    createdAt: z.string().pipe(z.coerce.date()),
    author: z.object({
      id: z.string(),
      username: z.string(),
    }),
  }),
);

type NewPostType = { text: string };

type PostsContextType = {
  posts: PostType[] | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: NewPostType) => Promise<void>;
};

const PostsContext = createContext<PostsContextType | null>(null);

function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<PostType[] | null>(null);

  const fetchPosts = async () => {
    try {
      const result = await axios.get('/api/posts');

      const posts = PostSchema.parse(result.data.posts);
      setPosts(posts);
    } catch (err) {
      console.error(err);
      setPosts(null);
    }
  };

  const addPost = async (post: NewPostType) => {
    try {
      const result = await axios.post('/api/posts', post);

      console.log(result);

      const updatedPosts = [...(posts ?? []), result.data.post];
      setPosts(updatedPosts);
    } catch (err) {
      console.error(err);
    }
  };

  return <PostsContext.Provider value={{ posts, fetchPosts, addPost }}>{children}</PostsContext.Provider>;
}

function usePostsContext() {
  const context = useContext(PostsContext);

  if (!context) throw Error('Use usePostsContext inside PostsProvider');

  return context;
}

export { usePostsContext, PostsProvider };
