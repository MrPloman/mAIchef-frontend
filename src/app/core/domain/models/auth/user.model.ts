export class User {
  private constructor(
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly _id?: string,
  ) {}

  static create(params: { email: string; _id: string }): User {
    if (!params.email) {
      throw new Error('User must have an email');
    }

    return new User(params.email, new Date(), params._id);
  }
}
