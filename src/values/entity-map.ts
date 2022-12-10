import { Maybe } from '.';
import {
  Path,
  PathSegment,
  Readable,
  Traversable,
  Writable,
} from '../types/common';
import {
  ValueMapIteratee,
  ValueMapValues,
  IValueMap,
  MaybeInput,
  ValueAny,
} from '../types/value';
import { None } from './maybe';
import { convertAny, convertMap, toPath } from './utils';

export class ValueMap<T> implements IValueMap<T> {
  #values: Maybe<ValueMapValues<T>> | undefined;

  private constructor(values?: any) {
    this._setValues(values);
  }

  private _setValues(values?: any): ValueMap<T> {
    this.#values = Maybe.create<ValueMapValues<T>>(convertMap(values));

    return this;
  }

  public forEach(iteratee: ValueMapIteratee<T>): void {
    const values = this.#values.unwrap() as ValueMapValues<T>;
    const keys = Object.keys(values);
    const len = keys.length;
    let pos = 0;

    while (pos < len) {
      const key = keys[pos];
      const value = values[key];

      if (iteratee(value, key) === false) {
        return;
      }

      pos++;
    }
  }

  public toJS(): any {
    const result: any = {};
    this.forEach((value, key) => {
      result[key] = value.toJS();
    });

    return result;
  }

  public isDisposed(): boolean {
    return this.#values.isNone();
  }

  public dispose(): void {
    if (this.isDisposed()) {
      return;
    }

    this.forEach((value, key) => {
      value.dispose();
      this.#values[key] = undefined;
    });

    this.#values = Maybe.create(undefined);
  }

  public getIn(path?: Path): ValueMap<T> | Maybe<any> {
    const segments = toPath(path);

    if (segments.isNone()) {
      return this;
    }

    const [first, ...rest] = segments.unwrap();

    const target = this.#values.unwrap()[first];

    return !target
      ? Maybe.create(undefined)
      : (target as Traversable).getIn(rest);
  }

  /*
  public setIn(value: any): ValueMap<T> {
    const [first, ...rest] = toPath(path);
    if (!first) {
      throw new Error('Path not found!');
    }

    const target: any = this.#values[first];
    if (!target && rest && rest.length) {
      throw new Error(`Path not found: ${path}`);
    }

    if (rest && rest.length) {
      (target as Writable<any>).setIn(rest, value);
    } else {
      this.#values[first] = convertAny(value);
    }

    return this;
  }
  */

  public static create<T>(values?: any): ValueMap<T> {
    return new ValueMap(values);
  }
}
