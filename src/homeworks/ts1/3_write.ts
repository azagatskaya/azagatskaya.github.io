import {
  getCategory,
  getId,
  getProductDesc,
  getProductName,
  getRandom,
  getRandomDate,
} from 'src/homeworks/ts1/mock/products';

/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

export type Category = {
  id: string;
  name: string;
  photo?: string;
};

type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

export type Operation = Cost | Profit;

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  const category: Category = getCategory();
  const prodName: string = getProductName(category.name);

  return {
    category,
    createdAt,
    id: `pr_${getId(6)}`,
    name: prodName,
    photo: `${prodName}.jpg`,
    price: Math.floor(Math.random() * 50_000) + 20_000,
    ...(getRandom(3) ? { desc: getProductDesc(prodName) } : {}),
    ...(getRandom(2) ? { oldPrice: Math.floor(Math.random() * 50_000) + 25_000 } : {}),
  };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const category: Category = getCategory();
  const type: 'Cost' | 'Profit' = getRandom(2) ? 'Cost' : 'Profit';
  return {
    id: `pr_${getId(6)}`,
    name: type === 'Cost' ? 'Трата' : 'Доход',
    ...(getRandom(3) ? { desc: type === 'Cost' ? 'Покупка техники' : 'Поступила оплата по счету' } : {}),
    createdAt,
    amount: Math.floor(Math.random() * 10_000),
    category,
    type,
  };
};

export const createRandomOperations = (count: number): Operation[] => {
  const operations = [];
  for (let i = count; i > 0; i--) {
    operations.push(createRandomOperation(getRandomDate()));
  }
  return operations;
};
