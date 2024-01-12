import api from '@/lib/api';
import { CommentArraySchema } from '@/types/Comment';

export async function fetchCommentsByPostId(postId: number | string) {
  try {
    const result = await api.get(`posts/${postId}/comments`);

    const comments = CommentArraySchema.parse(result.data.comments);

    return comments;
  } catch (err) {
    // console.error(err);
  }
}
