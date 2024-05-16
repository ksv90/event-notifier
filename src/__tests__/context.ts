import { EventNotifier } from '../index';

export interface Data {
  balanceChanged: number;
  updated: null;
  entityAdded: { id: number; name: string };
}

export type Context = {
  eventNotifier: EventNotifier<Data>;
};
