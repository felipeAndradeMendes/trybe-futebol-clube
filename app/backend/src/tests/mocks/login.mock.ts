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

export {
  user,
  validLoginBody,
  noEmailLoginBody,
  noPasswordLoginBody,
  invalidEmailFormatLoginBody,
  invalidPasswordFormatLoginBody,
};