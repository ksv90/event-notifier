import { beforeEach, expectTypeOf, test } from 'vitest';

import { EventNotifier } from '../index';
import { Context } from './context';

beforeEach<Context>((ctx) => {
  ctx.eventNotifier = new EventNotifier();
});

test<Context>('types test', ({ eventNotifier }) => {
  expectTypeOf(eventNotifier).toBeObject();
});
