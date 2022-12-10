import { Disposable, Readable, Serializeable, Writable } from './common';

export interface INone extends Serializeable<null>, Disposable {}
export interface ISome<T> extends Serializeable<T>, Disposable {}
export type MaybeInput<T> = T | null | undefined | ISome<T> | INone;

export interface IMaybe<T>
  extends Serializeable<T>,
    Disposable,
    Writable<MaybeInput<T>>,
    Readable<ISome<T> | INone> {
  isSome: () => boolean;
  isNone: () => boolean;
}

export type ValueAny<T> = IMaybe<T> | IValueMap<T> | IValueList<T>;

export type ValueMapValues<T> = {
  [key: string]: ValueAny<T>;
};

export type ValueMapIteratee<T> = (value: ValueAny<T>, key: string) => any;

export interface IValueMap<T>
  extends Serializeable<T>,
    Disposable,
    Writable<MaybeInput<T> | ValueAny<T>>,
    Readable<ValueAny<T>> {
  forEach: (iteratee: ValueMapIteratee<T>) => void;
}

export type ValueListValues<T> = ValueAny<T>[];

export type ValueListIteratee<T> = (value: ValueAny<T>, index: number) => any;

export interface IValueList<T> extends Serializeable<T>, Disposable {
  forEach: (iteratee: ValueListIteratee<T>) => void;
}
