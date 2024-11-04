/**
 * Здесь код с ошибками типов. Нужно их устранить
 * */

export const getFakeApi = async (): Promise<void> => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json());
  console.log(result);
};

export class SomeClass {
  set: Set<number>;
  channel: BroadcastChannel;

  constructor() {
    this.set = new Set([1]);
    this.channel = new BroadcastChannel('test-broadcast-channel');
  }
}

export type Data = {
  type: 'Money' | 'Percent';
  value: DataValue;
};

export type DataValue = Money | Percent;

export type Money = {
  currency: string;
  amount: number;
};

export type Percent = {
  percent: number;
};

const getDataAmount = (data: Data): number | never => {
  switch (data.type) {
    case 'Money':
      return (data.value as Money).amount;

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unhandled: 'Percent' | never = data.type; // здесь, возможно, нужно использовать нечто другое. :never должен остаться
      throw new Error(`unknown type: ${data.type}`);
    }
  }
};
