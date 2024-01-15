import api from '@/lib/api';
import { CommentArraySchema } from '@/types/Comment';
import { NewCommentType } from '@/types/NewComment';

export async function fetchCommentsByPostId(postId: number | string) {
  try {
    const result = await api.get(`comments?postid=${postId}`);

    const comments = CommentArraySchema.parse(result.data.comments);

    return comments;
  } catch (err) {
    console.error(err);
  }
}

export async function addComment(comment: NewCommentType) {
  try {
    const result = await api.post('/comments', comment);

    console.log(result.data);
  } catch (err) {
    console.error(err);
  }
}
