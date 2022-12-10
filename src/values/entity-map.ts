import { Path } from '../types/common';
import {
  ValueMapIteratee,
  ValueMapValues,
  IValueMap,
  MaybeInput,
  ValueAny,
} from '../types/value';
import { convertMap, toPath } from './utils';

export class ValueMap<T> implements IValueMap<T> {
  #values: ValueMapValues<T> | undefined;

  private constructor(values?: any) {
    this._setValues(values);
  }

  private _setValues(value?: MaybeInput<T>): ValueMap<T> {
    this.#values = convertMap(value);

    return this;
  }

  public forEach(iteratee: ValueMapIteratee<T>): void {
    const values = this.#values as ValueMapValues<T>;
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
    return this.#values === undefined;
  }

  public dispose(): void {
    if (this.isDisposed()) {
      return;
    }

    this.forEach((value, key) => {
      value.dispose();
      this.#values[key] = undefined;
    });

    this.#values = undefined;
  }

  public hasPath(): boolean {
    return true;
  }

  public set(values: MaybeInput<T> | ValueAny<T>): ValueMap<T> {
    return this._setValues(values);  
  }

  public setIn(path: Path, value: MaybeInput<T>|ValueAny<T>): ValueMap<T> {
    const segments = toPath(path);
    let target: Writeable<T> = this;
    while (segments.length) {
      const segement = segments.shift();
      if (!segement) {
        (target.
      }
    }
    
    return this;
  }
  //get: () => ValueAny<T>;
  //getIn: (path: Path) => ValueAny<T>;

  public static create<T>(values?: any): ValueMap<T> {
    return new ValueMap(values);
  }
}
