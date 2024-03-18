# event-notifier

### **typed event emitter**


## to install the package

```bash
npm install @ksv90/event-notifier
```

## after that you can use

```ts
type Data = {
  balance: { value: number };
  test: undefined;
};

const eventNotifier = new EventNotifier<Data>();

eventNotifier.on('balance', ({ value }) => {
  // your code
});

eventNotifier.emit({ type: 'test' });

eventNotifier.emit({ type: 'balance', value: 42 });
```

## data object

```ts
type Data = {
  balance: { value: number };
  test: undefined;
};

const eventNotifier = new EventNotifier<Data>();

eventNotifier.on('test', (data) => {
  // Object.entries(data).length === 0;
});

eventNotifier.on('balance', (data) => {
  // Object.entries(data).length === 1;
  // 'value' in data === true;
  // typeof data.value === 'number'
});
```

## erroneous statements

```ts
type Data = {
  balance: { value: number };
  test: undefined;
};

const eventNotifier = new EventNotifier<Data>();

// An argument of type ""asd" cannot be assigned to a parameter of type "keyof Data".ts(2345)
eventNotifier.on('asd', () => {});

// The "value" property is missing in the type "{ type: "balance"; }" and is required in the type "{ value: number; }".ts(2345)
eventNotifier.emit({ type: 'balance' });

// An object literal can only use unique properties. "data" does not exist in type "{ type: "test"; }.ts(2353)
eventNotifier.emit({ type: 'test', data: 42 });

// Type ""asd"" cannot be assigned to type "keyof Data".ts(2322)
eventNotifier.emit({ type: 'asd' });
```
