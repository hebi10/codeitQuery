const BASE_URL = 'https://learn.codeit.kr/api/codestudit';

interface User {
  createdAt: number;
  id: number;
  name: string;
  photo: string;
  updatedAt: number;
  username: string;
}

interface Post {
  content: string;
  createdAt: number;
  id: number;
  updatedAt: number;
  userId: number;
  user: User;
}

export interface PostData {
  data: {
    count: number;
    currentPage: number;
    hasMore: boolean;
    results: Post[];
  },
  results: Post[],
}

export async function getPostsByUsername(username: string) {
  const response = await fetch(`${BASE_URL}/posts?username=${username}`);
  return await response.json();
}

export async function getPosts(): Promise<PostData> {
  const response = await fetch(`${BASE_URL}/posts`);
  return await response.json();
}

export async function uploadPost(newPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error('Failed to upload the post.');
  }

  return await response.json();
}
