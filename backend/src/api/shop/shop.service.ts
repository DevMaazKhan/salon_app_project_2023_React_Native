import { CreateShopInput, Shops } from './shop.model';

class ShopService {
  static create = async (shop: CreateShopInput) =>
    Shops.create({
      data: {
        shopName: shop.shopName,
        userID: shop.userID,
      },
    });
}

export default ShopService;
