export interface Serializeable<T> {
  toJS: () => T;
}

export interface Disposable {
  dispose: () => void;
  isDisposed: () => boolean;
}
