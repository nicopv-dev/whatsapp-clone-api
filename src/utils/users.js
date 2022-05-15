export default class Users {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  verifyUserExist(newUser) {
    const userExists = this.users.includes(
      (user) => user.userId === newUser.userId
    );

    return userExists;
  }

  deleteUser(socketId) {
    this.users = this.users.filter((item) => item.socketId !== socketId);
  }

  getAllUsers() {
    return this.users;
  }

  // getUsersList(chat) {
  //   const users = this.users.filter((user) => user.chatId === chat);
  //   const list = users.map((user) => user._id);

  //   return list;
  // }

  // getUser(id) {
  //   return this.users.filter((user) => user._id === id);
  // }
}
