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
