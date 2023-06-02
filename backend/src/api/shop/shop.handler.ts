import { CreateShopInput, Shop } from './shop.model';
import ShopService from './shop.service';

class ShopHandler {
  static create = async (shop: CreateShopInput): Promise<Shop | undefined> => {
    const validatedShopInput = CreateShopInput.parse(shop);

    if (validatedShopInput) {
      const newShop = await ShopService.create({
        shopName: validatedShopInput.shopName,
      });

      return newShop;
    }

    return undefined;
  };
}

export default ShopHandler;
