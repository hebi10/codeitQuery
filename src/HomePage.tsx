import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPosts } from './api';

const HomePage: React.FC = () => {
  const result = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  console.log(result);

  return <div>홈페이지</div>;
}

export default HomePage;