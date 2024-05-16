import { bench, describe } from 'vitest';

import { EventNotifier } from '../index';
import { Data } from './context';

describe('benchmarking', () => {
  bench('on method without data', () => {
    const eventNotifier = new EventNotifier<Data>();
    const fn = (data: unknown) => {
      console.log(data);
    };
    eventNotifier.on('updated', fn);
    eventNotifier.emit('updated', null);
    eventNotifier.off('updated', fn);
  });

  bench('on method with primitive data', () => {
    const eventNotifier = new EventNotifier<Data>();
    const fn = (data: number) => {
      console.log(data);
    };
    eventNotifier.on('balanceChanged', fn);
    eventNotifier.emit('balanceChanged', 42);
    eventNotifier.off('balanceChanged', fn);
  });
});

bench('on method with object data', () => {
  const eventNotifier = new EventNotifier<Data>();
  const fn = (data: { id: number; name: string }) => {
    console.log(data);
  };
  eventNotifier.on('entityAdded', fn);
  eventNotifier.emit('entityAdded', { id: 42, name: 'name' });
  eventNotifier.off('entityAdded', fn);
});

// document.createElement('div').dispatchEvent({})
