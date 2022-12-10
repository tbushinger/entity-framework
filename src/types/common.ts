export interface Serializeable<T> {
  toJS: () => T;
}

export interface Disposable {
  dispose: () => void;
  isDisposed: () => boolean;
}

export type PathSegment = string | number;

export type PathSegments = PathSegment[];

export type Path = PathSegment | PathSegments;

export interface Traversable {
  getIn: (path: Path) => any;
  setIn: (value: any, path?: Path) => any;
}
