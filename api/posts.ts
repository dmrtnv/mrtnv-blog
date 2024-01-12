import api from '@/lib/api';
import { NewPostType } from '@/types/NewPost';
import { PostArraySchema, PostSchema } from '@/types/Post';

const fetchPosts = async () => {
  try {
    const result = await api.get('/posts');

    const posts = PostArraySchema.parse(result.data.posts);

    return posts;
  } catch (err) {
    // console.error(err);
    return [];
  }
};

const fetchPostById = async (postId: string | number) => {
  try {
    const result = await api.get(`/posts/${postId}`);
    return PostSchema.parse(result.data.post);
  } catch (err) {
    return null;
  }
};

const fetchPostsByUsername = async (username: string) => {
  try {
    const result = await api.get(`/users/${username}/posts`);

    return PostArraySchema.parse(result.data.posts);
  } catch (err: unknown) {
    // console.error(err);
    return [];
  }
};

const addPost = async (post: NewPostType) => {
  try {
    const result = await api.post('/posts', post);

    console.log(result.data.post);
  } catch (err) {
    // console.error(err);
  }
};

const toggleLike = async (postId: number) => {
  try {
    const result = await api.post(`/posts/${postId}/likes`);

    console.log(result.data.post);
  } catch (err: unknown) {
    // console.error(err);
  }
};

export { fetchPosts, fetchPostById, fetchPostsByUsername, addPost, toggleLike };
