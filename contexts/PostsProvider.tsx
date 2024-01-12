'use client';

import { PostType, PostArrayType } from '@/types/Post';
import api from '@/lib/api';
import React, { useContext, createContext, useState } from 'react';
import { PostArraySchema } from '@/types/Post';
import { NewPostType } from '@/types/NewPost';

type PostsContextType = {
  posts: PostArrayType | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: NewPostType) => Promise<void>;
  toggleLike: (postId: number) => Promise<void>;
  fetchPostsByUsername: (username: string) => Promise<void>;
};

const PostsContext = createContext<PostsContextType | null>(null);

function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<PostArrayType>([]);

  const fetchPosts = async () => {
    try {
      const result = await api.get('/posts');

      const posts = PostArraySchema.parse(result.data.posts);
      setPosts(posts);
    } catch (err) {
      // console.error(err);
      setPosts([]);
    }
  };

  const fetchPostsByUsername = async (username: string) => {
    try {
      const result = await api.get(`/users/${username}/posts`);

      if (!result.data.posts) return;

      setPosts(PostArraySchema.parse(result.data.posts));
    } catch (err: unknown) {
      // console.error(err);
      setPosts([]);
    }
  };

  const addPost = async (post: NewPostType) => {
    try {
      const result = await api.post('/posts', post);

      const updatedPosts = [...(posts ?? []), result.data.post];
      setPosts(updatedPosts);
    } catch (err) {
      // console.error(err);
    }
  };

  const toggleLike = async (postId: number) => {
    try {
      const result = await api.post(`/posts/${postId}/likes`);

      const newLikes = result.data.likes;
      const post = posts.find((post) => post.id === postId) as PostType;
      const updatedPost = { ...post, likes: newLikes };
      const updatedPosts = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));

      setPosts(updatedPosts);
    } catch (err: unknown) {
      // console.error(err);
    }
  };

  return (
    <PostsContext.Provider value={{ posts, fetchPosts, fetchPostsByUsername, addPost, toggleLike }}>
      {children}
    </PostsContext.Provider>
  );
}

function usePostsContext() {
  const context = useContext(PostsContext);

  if (!context) throw Error('Use usePostsContext inside PostsProvider');

  return context;
}

export { usePostsContext, PostsProvider };
