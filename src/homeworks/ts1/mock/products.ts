import { Category } from 'src/homeworks/ts1/3_write';

type MockCategory = {
  id: string;
  name: string;
  products: string[];
};

const mockCategories: Array<MockCategory> = [
  {
    id: 'cat_SgGe',
    name: 'notebook',
    products: [
      'Apple MacBook Pro 14 M3 2023',
      'Lenovo Legion 5 Pro',
      'Samsung Galaxy Book 3 Pro',
      'ASUS ROG Strix SCAR 17',
      'HP Spectre x360',
    ],
  },
  {
    id: 'cat_f6c',
    name: 'smartphone',
    products: [
      'Samsung Galaxy S24 Ultra',
      'Apple iPhone 15 Pro',
      'Xiaomi 14 Ultra',
      'Google Pixel 7 Pro',
      'Realme GT 6',
    ],
  },
  {
    id: 'cat_sNEn',
    name: 'monitor',
    products: [
      'TCL 115" 4K UHD QD-Mini LED Smart TV',
      'Samsung 65" 4K UHD Neo QLED',
      'LG 55" 4K UHD NanoCell',
      'Xiaomi Mi TV 86 MAX_C 86" 4K UHD LED',
      'Hisense 100" 4K UHD ULED',
    ],
  },
  {
    id: 'cat_XvXi',
    name: 'smart watch',
    products: [
      'Samsung Galaxy Watch Ultra 47 мм',
      'Huawei Watch Ultimate Design',
      'Garmin Marq Athlete Gen 2 Emea',
      'Xiaomi Watch S1 Active GL',
      'Apple Watch Series 9 45',
    ],
  },
];

const mockDesc = [
  '- это лучшее соотношение цены и качества',
  'отличается высокой производительностью',
  'считается выбором #1 среди представителей данного класса',
  'заслужил популярность среди покупателей благодаря высокому качеству',
  'лидирует по количеству положительных отзывов покупателей',
];

export const getId = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
};

export const getRandomCategoryIndex = (): number => {
  return Math.floor(Math.random() * mockCategories.length);
};

export const getCategory = (): Category => {
  const catIndex = getRandomCategoryIndex();
  const catName = mockCategories[catIndex].name;
  return {
    id: mockCategories[catIndex].id,
    name: catName,
    ...(getRandom(2) ? { photo: `${catName}.jpg` } : {}),
  };
};

export const getRandom = (coef: number): boolean => {
  return !((Math.floor(Math.random() * coef) + 1) % coef);
};

export const getProductName = (categoryName: string): string => {
  const category: MockCategory = mockCategories.find((c: MockCategory) => c.name === categoryName);
  return category.products[Math.floor(Math.random() * category.products.length)];
};

export const getProductDesc = (name: string): string => {
  return `${name} ${mockDesc[Math.floor(Math.random() * mockDesc.length)]}`;
};
