import { mockCategories as products } from 'src/shared/mock/products';

export const userDiscount = {
  standard: 0.03,
  premium: 0.05,
  gold: 0.07,
  free: 0,
};

type TProductDiscount = {
  [key in UserTypeEnum]?: number;
};

type TProductDiscountForUser = {
  [key in TProductType]?: TProductDiscount;
};

export const productDiscountForUser: TProductDiscountForUser = {
  Car: { premium: 0.05, gold: 0.1 },
  Toy: { standard: 0.05, premium: 0.1 },
  Food: { free: 0.01 },
};

export enum UserTypeEnum {
  Standard = 'standard',
  Premium = 'premium',
  Gold = 'gold',
  Free = 'free',
}

export type TProductType = 'Car' | 'Toy' | 'Food';

export type TDiscount = {
  productType: TProductType;
  discount: number;
};

export class AccountService {
  getProducts(): { name: string; type: 'Car' | 'Toy' | 'Food' }[][] {
    return products.slice(0, 3).map((pt) => {
      return pt.products.map((prod) => ({ name: prod, type: pt.name as TProductType }));
    });
  }

  getUserDiscountCommon(userType: UserTypeEnum): number {
    return userDiscount[userType] || 0;
  }

  getProductDiscountForUser(userType: UserTypeEnum, productType: TProductType): number {
    return productDiscountForUser[productType]?.[userType] || 0;
  }

  getTotalDiscount(userType: UserTypeEnum, productType: TProductType): number {
    return this.getUserDiscountCommon(userType) + this.getProductDiscountForUser(userType, productType);
  }
}
