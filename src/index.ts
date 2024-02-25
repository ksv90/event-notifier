export type EventNotifierListener<TData> = (data: TData extends object ? TData : object) => void;

export type NotifyType<TType> = { type: TType };

export class EventNotifier<TEventNotifierData extends Record<string, object | undefined>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected listenerMap = new Map<keyof TEventNotifierData, Set<EventNotifierListener<any>>>();

  public on<TType extends keyof TEventNotifierData>(
    type: TType,
    listener: EventNotifierListener<TEventNotifierData[TType]>,
  ): void {
    const listeners = this.listenerMap.get(type) ?? new Set();
    this.listenerMap.set(type, listeners);
    listeners.add(listener);
  }

  public off<TType extends keyof TEventNotifierData>(
    type: TType,
    listener: EventNotifierListener<TEventNotifierData[TType]>,
  ): void {
    this.listenerMap.get(type)?.delete(listener);
  }

  public notify<TType extends keyof TEventNotifierData>(
    event: TEventNotifierData[TType] extends object ? NotifyType<TType> & TEventNotifierData[TType] : NotifyType<TType>,
  ): void {
    const { type, ...data } = event;
    this.listenerMap.get(type)?.forEach((listener) => listener(data));
  }
}
