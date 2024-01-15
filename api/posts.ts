import api from '@/lib/api';
import { NewPostType } from '@/types/NewPost';
import { PostArraySchema, PostSchema } from '@/types/Post';

export async function fetchPosts() {
  try {
    const result = await api.get('/posts');

    return PostArraySchema.parse(result.data.posts);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchPostById(postId: string | number) {
  try {
    const result = await api.get(`/posts/${postId}`);

    return PostSchema.parse(result.data.post);
  } catch (err) {
    return null;
  }
}

export async function fetchPostsByUsername(username: string) {
  try {
    const result = await api.get(`/posts?username=${username}`);

    return PostArraySchema.parse(result.data.posts);
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
}

export async function addPost(post: NewPostType) {
  try {
    const result = await api.post('/posts', post);

    console.log(result.data);
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(postId: number) {
  try {
    const result = await api.delete(`/posts/${postId}`);
    console.log(result.data);
  } catch (err) {
    console.error(err);
  }
}

export async function toggleLike(postId: number) {
  try {
    const result = await api.post('/likes', postId);

    console.log(result.data);
  } catch (err: unknown) {
    console.error(err);
  }
}
