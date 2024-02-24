import { bench, describe } from 'vitest';

import { EventNotifier } from '../index';
import { Data } from './context';

describe('benchmarking', () => {
  const fn = ({ value = 1 }) => value + 1;

  bench('on method without data', () => {
    const eventNotifier = new EventNotifier<Data>();
    eventNotifier.on('test', fn);
    eventNotifier.notify({ type: 'test' });
    eventNotifier.off('test', fn);
  });

  bench('on method with data', () => {
    const eventNotifier = new EventNotifier<Data>();
    eventNotifier.on('balance', fn);
    eventNotifier.notify({ type: 'balance', value: 42 });
    eventNotifier.off('balance', fn);
  });
});
