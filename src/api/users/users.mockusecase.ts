// Mock User for testing purpose
type User = any;

export class MockUsersUsecase {
  private readonly users = [
    {
      userId: 1,
      username: 'user',
      password: 'password',
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}