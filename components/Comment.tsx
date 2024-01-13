import { CommentType } from '@/types/Comment';
import UserHoverCard from './UserHoverCard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function Comment({ comment }: { comment: CommentType }) {
  return (
    <article className='w-full rounded-xl border p-4'>
      <div className='flex items-center gap-4'>
        <UserHoverCard user={comment.author} />
        <span>·</span>
        <span className='cursor-pointer text-sm'>{dayjs(comment.createdAt).fromNow()}</span>
      </div>

      <div className='my-2'>{comment.text}</div>
    </article>
  );
}

export default Comment;
