import ErrorResponse from '../../util/createError';
import Hash from '../../util/hash';
import {
  LoginUserInput,
  User,
  UserWithPassword,
  UserWithoutAddress,
} from './user.model';
import UserService from './user.service';

class UserHandler {
  static create = async (user: UserWithPassword): Promise<User> => {
    const { hashedPassword, salt } = await Hash.calculateHash(user.password);

    const newUser = await UserService.create({
      ...user,
      salt,
      password: hashedPassword,
    });

    return newUser as User;
  };

  static getUserByEmail = async (
    email: string
  ): Promise<UserWithoutAddress | null> => {
    const newUser = await UserService.getUserByEmail(email);

    return newUser;
  };

  static getUserByPasswordAndEmail = async (
    email: string,
    password: string
  ): Promise<UserWithoutAddress | null> => {
    const newUser = await UserService.getUserByPasswordAndEmail(
      email,
      password
    );

    return newUser;
  };

  static login = async (
    user: LoginUserInput
  ): Promise<UserWithoutAddress | null> => {
    const emailMatchedUser = await this.getUserByEmail(user.email);

    if (!emailMatchedUser) {
      throw new ErrorResponse('Email or Password is Incorrect', 400);
    }

    const { hashedPassword } = await Hash.calculateHashWithSalt(
      user.password,
      emailMatchedUser.salt
    );

    const emailAndPasswordMatchedUser = await this.getUserByPasswordAndEmail(
      user.email,
      hashedPassword
    );

    if (!emailAndPasswordMatchedUser) {
      throw new ErrorResponse('Email or Password is Incorrect', 400);
    }

    return emailAndPasswordMatchedUser;
  };
}

export default UserHandler;
