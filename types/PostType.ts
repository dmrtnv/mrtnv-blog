type PostType = {
  text: string;
  id: number;
  createdAt: Date;
  author: {
    id: string;
    username: string;
    fullName: string;
    bio?: string | null;
    profilePictureUrl?: string | null;
  };
  likes: {
    id: number;
    user: {
      id: string;
      username: string;
    };
  }[];
};

export default PostType;
