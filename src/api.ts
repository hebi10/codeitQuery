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

interface PostData {
  data: {
    count: number;
    currentPage: number;
    hasMore: boolean;
    results: Post[];
  };
}

export async function getPosts(): Promise<PostData> {
  const response = await fetch(`${BASE_URL}/posts`);
  return await response.json();
}
