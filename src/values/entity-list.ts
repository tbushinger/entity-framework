/*
import { ValueListIteratee, ValueListValues, IValueList } from '../types/value';

export class ValueList<T> implements IValueList<T> {
  #values: ValueListValues<T> | undefined;

  private constructor(values: ValueListValues<T> = []) {
    this.#values = values;
  }

  public forEach(iteratee: ValueListIteratee<T>): void {
    const values = this.#values as ValueListValues<T>;
    const len = values.length;
    let pos = 0;

    while (pos < len) {
      const value = values[pos];

      if (iteratee(value, pos) === false) {
        return;
      }

      pos++;
    }
  }

  public toJS(): any {
    const result: any[] = [];
    this.forEach((value, idx) => {
      result[idx] = value.toJS();
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

    this.forEach((value, idx) => {
      value.dispose();
      this.#values[idx] = undefined;
    });

    this.#values = undefined;
  }

  public static create<T>(values: ValueListValues<T> = []): ValueList<T> {
    return new ValueList(values);
  }
}
*/
