type PostType = {
  text: string;
  id: number;
  createdAt: Date;
  author: {
    id: string;
    username: string;
  };
};

export default PostType;
