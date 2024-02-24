import { EventNotifier } from '../index';

export type Data = {
  balance: { value: number };
  test: undefined;
};

export type Context = {
  eventNotifier: EventNotifier<Data>;
};
