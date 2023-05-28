import { UserWithPassword, Users } from './user.model';

class UserService {
  static create = async (user: UserWithPassword) =>
    Users.create({
      data: {
        isVerified: user.isVerified,
        email: user.email,
        password: user.password,
        salt: user.salt,
        userTypeID: 1,
        address: {
          create: {
            addressLine1: user.address.addressLine1,
            addressLine2: user.address.addressLine2 || '',
            Country: {
              connect: { countryID: user.address.countryID },
            },
            State: {
              connect: { stateID: user.address.stateID },
            },
            City: {
              connect: { cityID: user.address.cityID },
            },
          },
        },
      },
      include: {
        address: true,
      },
    });

  static getUserByEmail = async (email: string) =>
    Users.findFirst({
      where: { email },
      select: {
        email: true,
        isVerified: true,
        password: false,
        salt: true,
        userTypeID: true,
        userID: true,
      },
    });

  static getUserByPasswordAndEmail = async (email: string, password: string) =>
    Users.findFirst({
      where: { email, password },
      select: {
        email: true,
        isVerified: true,
        password: false,
        salt: true,
        userTypeID: true,
        userID: true,
      },
    });
}

export default UserService;
