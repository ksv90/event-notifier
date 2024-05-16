// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotifierListener<TData = any> = (data: TData) => void | Promise<void>;

export type NotifyOptions = {
  readonly once?: boolean;
};

export interface IEventNotifier<TNotifierData extends object> {
  on<TName extends keyof TNotifierData>(name: TName, listener: NotifierListener<TNotifierData[TName]>): void;
  once<TName extends keyof TNotifierData>(name: TName, listener: NotifierListener<TNotifierData[TName]>): void;
  off<TName extends keyof TNotifierData>(name: TName, listener: NotifierListener<TNotifierData[TName]>): void;
}
