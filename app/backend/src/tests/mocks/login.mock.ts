const user = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'  
}

const validLoginBody = {
  email: 'user@user.com',
  password: 'secret_user',
}

const noEmailLoginBody = {
  password: 'secret_user',
}

const noPasswordLoginBody = {
  email: 'user@user.com',
}

const invalidEmailFormatLoginBody = {
  email: 'invalidemail@user',
  password: 'secret_user',
}

const invalidPasswordFormatLoginBody = {
  email: 'user@user.com',
  password: '123456',
}

const genericToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCRZOEFiaThqWHZzWHlxbS5ybXAwQi51UUJBNXFVejdUNkdobGcvQ3ZWci9nTHhZajVVQVpWTyIsImlhdCI6MTY4OTM2NzM3NH0.SY6qsdojd1L7g4trmIkZZ7VvaeunY9tl3Ucn8WLsrNI';

export {
  user,
  validLoginBody,
  noEmailLoginBody,
  noPasswordLoginBody,
  invalidEmailFormatLoginBody,
  invalidPasswordFormatLoginBody,
  genericToken,
};