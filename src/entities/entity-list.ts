import {
  EntityListIteratee,
  EntityListValues,
  IEntityList,
} from '../types/entity';

export class EntityList<T> implements IEntityList<T> {
  #values: EntityListValues<T> | undefined;

  private constructor(values: EntityListValues<T> = []) {
    this.#values = values;
  }

  public forEach(iteratee: EntityListIteratee<T>): void {
    const values = this.#values as EntityListValues<T>;
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

  public static create<T>(values: EntityListValues<T> = []): EntityList<T> {
    return new EntityList(values);
  }
}
