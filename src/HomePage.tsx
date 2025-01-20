import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPosts, uploadPost } from './api';

interface NewPostType {
  username: string, 
  content: string,
}

const HomePage:FC = () => {
  const [content, setContent] = useState('');
  const {
    data: postsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    retry: 0,
  });

  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: NewPostType = { username: 'codeit', content };
    uploadPostMutation.mutate(newPost);
    setContent('');
  };

  if (isPending) return '로딩 중입니다...';

  if (isError) return '에러가 발생했습니다.';

  const posts = postsData?.results ?? [];

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
          />
          <button disabled={!content} type="submit">
            업로드
          </button>
        </form>
      </div>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.user.name}: {post.content}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HomePage;
