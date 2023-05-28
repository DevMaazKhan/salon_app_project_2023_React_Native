import { type Request, type Response, type NextFunction } from 'express';
import userHandler from './user.handler';
import {
  CreateUserInput,
  LoginUserInput,
  User,
  UserWithoutAddress,
} from './user.model';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import ErrorResponse from '../../util/createError';
import Token from '../../util/jwt';
import config from '../../util/config';

class UserController {
  static create = async (
    req: Request<void, SuccessResponse<User>, CreateUserInput | undefined>,
    res: Response<SuccessResponse<User>>,
    next: NextFunction
  ) => {
    try {
      const user = CreateUserInput.parse(req.body ?? {});

      const newUser = await userHandler.create({
        email: user.email,
        password: user.password,
        isVerified: true,
        salt: '',
        address: {
          addressLine1: user.address.addressLine1,
          addressLine2: user.address.addressLine2,
          cityID: user.address.cityID,
          countryID: user.address.countryID,
          stateID: user.address.stateID,
        },
      });

      res.send(createSuccessResponse(newUser, 'User Created Successfully'));
    } catch (error) {
      next(error);
    }
  };

  static login = async (
    req: Request<
      void,
      SuccessResponse<UserWithoutAddress>,
      LoginUserInput | undefined
    >,
    res: Response<SuccessResponse<UserWithoutAddress>>,
    next: NextFunction
  ) => {
    try {
      const user = LoginUserInput.parse(req.body ?? {});

      const loggedInUser = await userHandler.login(user);

      if (
        !loggedInUser ||
        loggedInUser === null ||
        !loggedInUser.userID ||
        loggedInUser.userID === 0
      ) {
        next(new ErrorResponse('Email or Password is Incorrect', 400));
      }

      const accessToken = Token.getJWTToken(
        { userID: loggedInUser?.userID },
        config.JWT_ACCESS_TOKEN_PRIVATE_KEY,
        '1y'
      );

      res.cookie('accessToken', accessToken);

      res.send(
        createSuccessResponse(
          loggedInUser as UserWithoutAddress,
          'User Logged in Successfully'
        )
      );
    } catch (error) {
      next(error);
    }

    return next();
  };
}

export default UserController;
