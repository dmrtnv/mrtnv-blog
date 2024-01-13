import api from '@/lib/api';
import { NewPostType } from '@/types/NewPost';
import { PostArraySchema, PostSchema } from '@/types/Post';

export async function fetchPosts() {
  try {
    const result = await api.get('/posts');

    const posts = PostArraySchema.parse(result.data.posts);

    return posts;
  } catch (err) {
    // console.error(err);
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
    const result = await api.get(`/users/${username}/posts`);

    return PostArraySchema.parse(result.data.posts);
  } catch (err: unknown) {
    // console.error(err);
    return [];
  }
}

export async function addPost(post: NewPostType) {
  try {
    const result = await api.post('/posts', post);

    console.log(result.data.post);
  } catch (err) {
    // console.error(err);
  }
}

export async function toggleLike(postId: number) {
  try {
    const result = await api.post(`/posts/${postId}/likes`);

    console.log(result.data.post);
  } catch (err: unknown) {
    // console.error(err);
  }
}

export async function deletePost(postId: number) {
  try {
    const result = await api.delete(`/posts/${postId}`);
    console.log(result);
  } catch (err) {
    // console.error(err);
  }
}
