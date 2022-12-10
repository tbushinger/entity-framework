import { ValueMapIteratee, ValueMapValues, IValueMap } from '../types/value';

export class ValueMap<T> implements IValueMap<T> {
  #values: ValueMapValues<T> | undefined;

  private constructor(values: ValueMapValues<T> = {}) {
    this.#values = values;
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

  public static create<T>(values: ValueMapValues<T> = {}): ValueMap<T> {
    return new ValueMap(values);
  }
}
