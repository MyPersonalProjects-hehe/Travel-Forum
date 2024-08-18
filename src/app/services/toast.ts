export const uploadPostSuccess = {
  severity: 'success',
  summary: 'Success',
  detail: 'Successfully uploaded post in your home page!',
  life: 3000,
};

export const uploadPostError = (error: any) => {
  return {
    severity: 'error',
    summary: 'Error',
    detail: `${error}`,
    life: 3000,
  };
};

export const loginSuccess = {
  severity: 'success',
  summary: 'Success',
  detail: 'Successfully logged in!',
  life: 3000,
};

export const loginError = (error: any) => {
  return {
    severity: 'error',
    summary: 'Error',
    detail: `${error}`,
    life: 3000,
  };
};

export const registerError = (error: any) => {
  return {
    severity: 'error',
    summary: 'Error',
    detail: `${error}`,
    life: 3000,
  };
};

export const uploadCommentError = (error: any) => {
  return {
    severity: 'error',
    summary: 'Error',
    detail: `${error}`,
    life: 3000,
  };
};

export const uploadCommentSuccess = {
  severity: 'success',
  summary: 'Success',
  detail: `You can view your comment in the full view post!`,
  life: 3000,
};
