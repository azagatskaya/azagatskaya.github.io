import { AccountService, TProductType, UserTypeEnum } from 'src/services/AccountService/AccountService';

describe('AccountService', () => {
  const accountService: AccountService = new AccountService();

  describe('Positive', () => {
    test('discount is 3% for any product for Standard user', () => {
      const res: number = accountService.getUserDiscountCommon(UserTypeEnum.Standard);
      expect(res).toBe(0.03);
    });
    test('discount is 5% for any product for Premium user', () => {
      const res: number = accountService.getUserDiscountCommon(UserTypeEnum.Premium);
      expect(res).toBe(0.05);
    });
    test('discount is 7% for any product for Gold user', () => {
      const res: number = accountService.getUserDiscountCommon(UserTypeEnum.Gold);
      expect(res).toBe(0.07);
    });
    test('discount is 0% for any product for Free user', () => {
      const res: number = accountService.getUserDiscountCommon(UserTypeEnum.Free);
      expect(res).toBe(0);
    });

    test('discount is 5% for product Car and Premium user', () => {
      const res: number = accountService.getProductDiscountForUser(UserTypeEnum.Premium, 'Car');
      expect(res).toBe(0.05);
    });
    test('discount is 10% for product Car and Gold user', () => {
      const res: number = accountService.getProductDiscountForUser(UserTypeEnum.Gold, 'Car');
      expect(res).toBe(0.1);
    });
    test('discount is 1% for product Food and Free user', () => {
      const res: number = accountService.getProductDiscountForUser(UserTypeEnum.Free, 'Food');
      expect(res).toBe(0.01);
    });

    test('total discount is 10% for Car for Premium user', () => {
      const res: number = accountService.getTotalDiscount(UserTypeEnum.Premium, 'Car');
      expect(res).toBe(0.1);
    });
    test('total discount is 3% for Car for Standard user', () => {
      const res: number = accountService.getTotalDiscount(UserTypeEnum.Standard, 'Car');
      expect(res).toBe(0.03);
    });
    test('total discount is 1% for Food for Free user', () => {
      const res: number = accountService.getTotalDiscount(UserTypeEnum.Free, 'Food');
      expect(res).toBe(0.01);
    });
  });

  describe('Negative', () => {
    test('discount is 0% for unknown user type', () => {
      const res: number = accountService.getUserDiscountCommon('Custom' as UserTypeEnum);
      expect(res).toBe(0);
    });

    test('discount is 0% for product Car and unknown user type', () => {
      const res: number = accountService.getProductDiscountForUser('Custom' as UserTypeEnum, 'Car');
      expect(res).toBe(0);
    });
    test('discount is 0% for unknown product and Premium user', () => {
      const res: number = accountService.getProductDiscountForUser(UserTypeEnum.Premium, 'Unknown' as TProductType);
      expect(res).toBe(0);
    });
  });
});
