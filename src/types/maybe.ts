import { Disposable, Serializeable, Traversable } from './common';

export interface None extends Serializeable, Disposable {}
export interface Some extends Serializeable, Disposable {}
export interface Maybe extends Serializeable, Disposable, Traversable {
  isSome: () => boolean;
  isNone: () => boolean;
  unwrap: () => Some | None;
}

/*
export type ValueAny<T> = IMaybe<T> | IValueMap<T> | IValueList<T>;

export type ValueMapValues<T> = {
  [key: string]: ValueAny<T>;
};

export type ValueMapIteratee<T> = (value: ValueAny<T>, key: string) => any;

export interface IValueMap<T>
  extends Serializeable<T>,
    Disposable,
    Traversable {
  forEach: (iteratee: ValueMapIteratee<T>) => void;
}

export type ValueListValues<T> = ValueAny<T>[];

export type ValueListIteratee<T> = (value: ValueAny<T>, index: number) => any;

export interface IValueList<T> extends Serializeable<T>, Disposable {
  forEach: (iteratee: ValueListIteratee<T>) => void;
}
*/
