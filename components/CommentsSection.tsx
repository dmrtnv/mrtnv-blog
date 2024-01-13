import { CommentType } from '@/types/Comment';
import React from 'react';
import Comment from './Comment';

function CommentsSection({ comments }: { comments: CommentType[] }) {
  return (
    <ul className='flex flex-col gap-2'>
      {comments.toReversed().map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
}

export default CommentsSection;
