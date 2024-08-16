export const validatePost = (post: any) => {
  if (post.title.length <= 4) {
    throw new Error('Title must be more than 4 characters!');
  }
  if (post.description.length <= 7) {
    throw new Error('Description must be more than 7 characters!');
  }
  if (post.shortDescription.length <= 7) {
    throw new Error('Short description must be more than 7 characters!');
  }
  if (!post.image) {
    throw new Error('Please provide an image!');
  }
};

export const validateRegister = (
  email: string,
  username: string,
  users: any
) => {
  if (!email.includes('@')) {
    throw new Error('Please provide a valid email!');
  }

  if (users.includes(username)) {
    throw new Error('Username is already in use!');
  }

  if (username.length < 3) {
    throw new Error('Username must be more than 3 characters!');
  }
};
