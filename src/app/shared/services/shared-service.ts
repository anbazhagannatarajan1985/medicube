export class SharedService {
  currentUser: string;

  setCurrentUser(user: string) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
