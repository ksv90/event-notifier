export type EventNotifierListener<TData> = (data: TData extends object ? TData : object) => void;

export type NotifyType<TKey> = { type: TKey };

export class EventNotifier<TEventNotifierData extends Record<string, object | undefined>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected listenerMap = new Map<keyof TEventNotifierData, Set<EventNotifierListener<any>>>();

  public on<TKey extends keyof TEventNotifierData>(
    key: TKey,
    listener: EventNotifierListener<TEventNotifierData[TKey]>,
  ): void {
    const listeners = this.listenerMap.get(key) ?? new Set();
    this.listenerMap.set(key, listeners);
    listeners.add(listener);
  }

  public off<TKey extends keyof TEventNotifierData>(
    key: TKey,
    listener: EventNotifierListener<TEventNotifierData[TKey]>,
  ): void {
    this.listenerMap.get(key)?.delete(listener);
  }

  public notify<TKey extends keyof TEventNotifierData>(
    event: TEventNotifierData[TKey] extends object ? NotifyType<TKey> & TEventNotifierData[TKey] : NotifyType<TKey>,
  ): void {
    const { type, ...data } = event;
    this.listenerMap.get(type)?.forEach((listener) => listener(data));
  }
}
