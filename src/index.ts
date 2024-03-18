// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventNotifierListener<TData = any> = (data: TData extends object ? TData : object) => void | Promise<void>;

export type NotifyType<TType> = { type: TType };

export type NotifyListenerOptions = {
  readonly once?: boolean;
};

export class EventNotifier<TEventNotifierData extends Record<string, object | undefined>> {
  protected listenerMap = new Map<
    keyof TEventNotifierData,
    Map<EventNotifierListener, NotifyListenerOptions | undefined>
  >();

  public emit<TType extends keyof TEventNotifierData>(
    event: TEventNotifierData[TType] extends object ? NotifyType<TType> & TEventNotifierData[TType] : NotifyType<TType>,
  ): void {
    const { type, ...data } = event;
    this.listenerMap.get(type)?.forEach((options, listener, map) => {
      if (options?.once) map.delete(listener);
      void listener(data);
    });
  }

  public on<TType extends keyof TEventNotifierData>(
    type: TType,
    listener: EventNotifierListener<TEventNotifierData[TType]>,
    options?: NotifyListenerOptions,
  ): void {
    const listeners = this.listenerMap.get(type) ?? new Map<EventNotifierListener, NotifyListenerOptions>();
    listeners.set(listener, options);
    this.listenerMap.set(type, listeners);
  }

  public off<TType extends keyof TEventNotifierData>(
    type: TType,
    listener: EventNotifierListener<TEventNotifierData[TType]>,
  ): void {
    this.listenerMap.get(type)?.forEach((_, currentListener, map) => {
      if (currentListener !== listener) return;
      map.delete(listener);
    });
  }

  public once<TType extends keyof TEventNotifierData>(
    type: TType,
    listener: EventNotifierListener<TEventNotifierData[TType]>,
    options?: Omit<NotifyListenerOptions, 'once'>,
  ) {
    this.on(type, listener, { ...options, once: true });
  }

  public has<TType extends keyof TEventNotifierData>(
    type: TType,
    listener: EventNotifierListener<TEventNotifierData[TType]>,
  ): boolean {
    const listeners = this.listenerMap.get(type);
    return !!listeners && listeners.has(listener);
  }

  public delete<TType extends keyof TEventNotifierData>(type: TType): void {
    this.listenerMap.delete(type);
  }

  public clear(): void {
    this.listenerMap.clear();
  }
}
