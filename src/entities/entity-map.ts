import {
  EntityMapIteratee,
  EntityMapValues,
  IEntityMap,
} from '../types/entity';

export class EntityMap<T> implements IEntityMap<T> {
  #values: EntityMapValues<T> | undefined;

  private constructor(values: EntityMapValues<T> = {}) {
    this.#values = values;
  }

  public forEach(iteratee: EntityMapIteratee<T>): void {
    const values = this.#values as EntityMapValues<T>;
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

  public static create<T>(values: EntityMapValues<T> = {}): EntityMap<T> {
    return new EntityMap(values);
  }
}
