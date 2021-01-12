export type CustomHandler<T, G> = (item: T) => G;
export type CustomBooleanHandler<T> = CustomHandler<T, boolean>;
export type CustomStringHandler<T> = CustomHandler<T, string>;
export type CustomNumberHandler<T> = CustomHandler<T, number>;
