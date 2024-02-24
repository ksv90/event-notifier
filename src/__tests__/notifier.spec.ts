import { beforeEach, expect, test } from 'vitest';

import { EventNotifier } from '..';
import { Context } from './context';

beforeEach<Context>((ctx) => {
  ctx.eventNotifier = new EventNotifier();
});

test<Context>('notifier test', ({ eventNotifier }) => {
  expect(eventNotifier).toBeInstanceOf(EventNotifier);
});
