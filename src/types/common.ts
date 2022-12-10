export interface Serializeable<T> {
  toJS: () => T;
}

export interface Disposable {
  dispose: () => void;
  isDisposed: () => boolean;
}

export type PathSegment = string | number;

export type PathSegments = PathSegment[];

export type Path = PathSegment | PathSegments | undefined | null;

export interface Writable<T> {
  set: (value: T) => any;
  setIn: (path: Path, value: T) => any;
  hasPath: () => boolean;
}

export interface Readable<T> {
  get: () => T;
  getIn: (path: Path) => T;
  hasPath: () => boolean;
}
