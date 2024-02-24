export type EventNotifierListener<T> = (data: T) => void;

export type EventNotifierData = Record<string, object | undefined>;

export class EventNotifier<TEventNotifierData extends EventNotifierData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected listenerMap = new Map<keyof TEventNotifierData, Set<EventNotifierListener<any>>>();

  public on<TKey extends keyof TEventNotifierData, TData extends TEventNotifierData[TKey]>(
    key: TKey,
    listener: EventNotifierListener<TData extends object ? TData : object>,
  ): void {
    const listeners = this.listenerMap.get(key) ?? new Set();
    this.listenerMap.set(key, listeners);
    listeners.add(listener);
  }

  public off<TKey extends keyof TEventNotifierData, TData extends TEventNotifierData[TKey]>(
    key: TKey,
    listener: EventNotifierListener<TData extends object ? TData : object>,
  ): void {
    this.listenerMap.get(key)?.delete(listener);
  }

  public notify<TKey extends keyof TEventNotifierData, TData extends TEventNotifierData[TKey]>({
    type,
    ...data
  }: { type: TKey } & (TData extends object ? TData : object)): void {
    this.listenerMap.get(type)?.forEach((listener) => listener(data));
  }
}
