import { CommentType } from '@/types/Comment';
import UserHoverCard from './UserHoverCard';

function Comment({ comment }: { comment: CommentType }) {
  return (
    <article className='w-full rounded-xl border p-4'>
      <div className='flex items-center gap-4'>
        <UserHoverCard user={comment.author} />
      </div>

      <div className='my-2'>{comment.text}</div>
    </article>
  );
}

export default Comment;
