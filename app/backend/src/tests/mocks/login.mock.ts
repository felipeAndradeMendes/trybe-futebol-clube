const user = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'  
}

// const user1 = users {
//   dataValues: {
//     id: 2,
//     username: 'User',
//     role: 'user',
//     email: 'user@user.com',
//     password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
//   },
//   _previousDataValues: {
//     id: 2,
//     username: 'User',
//     role: 'user',
//     email: 'user@user.com',
//     password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
//   },
//   uniqno: 1,
//   _changed: Set(0) {},
//   _options: {
//     isNewRecord: false,
//     _schema: null,
//     _schemaDelimiter: '',
//     raw: true,
//     attributes: [ 'id', 'username', 'role', 'email', 'password' ]
//   },
//   isNewRecord: false
// }

const validLoginBody = {
  email: 'user@user.com',
  password: 'secret_user',
}

export {
  user,
  validLoginBody,
};