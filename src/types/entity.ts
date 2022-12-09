import { Disposable, Serializeable } from './common';

export interface INone extends Serializeable<null>, Disposable {}
export interface ISome<T> extends Serializeable<T>, Disposable {}
export type MaybeInput<T> = T | null | undefined | ISome<T> | INone;

export interface IMaybe<T> extends Serializeable<T>, Disposable {
  isSome: () => boolean;
  isNone: () => boolean;
}

export type EntityAny<T> = IMaybe<T> | IEntityMap<T> | IEntityList<T>;

export type EntityMapValues<T> = {
  [key: string]: EntityAny<T>;
};

export type EntityMapIteratee<T> = (value: EntityAny<T>, key: string) => any;

export interface IEntityMap<T> extends Serializeable<T>, Disposable {
  forEach: (iteratee: EntityMapIteratee<T>) => void;
}

export type EntityListValues<T> = EntityAny<T>[];

export type EntityListIteratee<T> = (value: EntityAny<T>, index: number) => any;

export interface IEntityList<T> extends Serializeable<T>, Disposable {
  forEach: (iteratee: EntityListIteratee<T>) => void;
}
