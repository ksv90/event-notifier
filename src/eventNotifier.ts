import { IEventNotifier, NotifierListener, NotifyOptions } from './types';

export class EventNotifier<TNotifierData extends object> implements IEventNotifier<TNotifierData> {
  readonly #listenerMap = new Map<keyof TNotifierData, Map<NotifierListener, NotifyOptions | undefined>>();

  public emit<TName extends keyof TNotifierData>(name: TName, data: TNotifierData[TName]): void {
    this.#listenerMap.get(name)?.forEach((options, listener, map) => {
      if (options?.once) map.delete(listener);
      void listener(data);
    });
  }

  public on<TName extends keyof TNotifierData>(
    name: TName,
    listener: NotifierListener<TNotifierData[TName]>,
    options?: NotifyOptions,
  ): void {
    let listeners = this.#listenerMap.get(name);
    if (!listeners) {
      listeners = new Map<NotifierListener, NotifyOptions>();
      this.#listenerMap.set(name, listeners);
    }
    listeners.set(listener, options);
  }

  public off<TName extends keyof TNotifierData>(name: TName, listener: NotifierListener<TNotifierData[TName]>): void {
    const listeners = this.#listenerMap.get(name);
    listeners?.delete(listener);
  }

  public once<TName extends keyof TNotifierData>(
    name: TName,
    listener: NotifierListener<TNotifierData[TName]>,
    options?: Omit<NotifyOptions, 'once'>,
  ) {
    this.on(name, listener, { ...options, once: true });
  }

  public hasListener<TName extends keyof TNotifierData>(
    name: TName,
    listener: NotifierListener<TNotifierData[TName]>,
  ): boolean {
    const listeners = this.#listenerMap.get(name);
    return !!listeners && listeners.has(listener);
  }

  public deleteListeners<TName extends keyof TNotifierData>(name: TName): void {
    this.#listenerMap.delete(name);
  }

  public clearAll(): void {
    this.#listenerMap.clear();
  }
}
