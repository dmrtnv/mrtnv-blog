'use client';

import fetchPosts from '@/api/fetchPosts';
import Post from './Post';
import PostType from '@/types/PostType';
import { useLayoutEffect, useState } from 'react';

function Feed() {
  const [posts, setPosts] = useState<PostType[] | null>(null);

  useLayoutEffect(() => {
    (async () => {
      const posts = await fetchPosts();

      setPosts(posts);
    })();
  }, []);

  if (!posts) return <div>No posts</div>;

  return (
    <ul className='mx-auto flex list-none flex-col items-center gap-2 p-2'>
      {posts.map((post) => (
        <li key={post.title}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

export default Feed;
