// Import stylesheets
//import './style.css';

// Write TypeScript code!
//const appDiv: HTMLElement = document.getElementById('app');
//appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
interface Serializeable<T> {
  toJS: () => T;
}

interface Disposable {
  dispose: () => void;
  isDisposed: () => boolean;
}

class None implements Serializeable<null>, Disposable {
  #value: any = null;

  private static instance: None;

  public static create(): None {
    if (!this.instance) {
      this.instance = new None();
    }

    return this.instance;
  }

  public toJS(): null {
    return this.#value;
  }

  public isDisposed(): boolean {
    return true;
  }

  public dispose(): void {
    if (!this.isDisposed()) {
      this.#value = this.#value;
    }
  }
}

class Some<T> implements Serializeable<T>, Disposable {
  #value: T | undefined;

  private constructor(value: T) {
    this.#value = value;
  }

  public static create<T>(value: T): Some<T> {
    return new Some<T>(value);
  }

  public toJS(): any {
    return this.#value;
  }

  public isDisposed(): boolean {
    return this.#value !== undefined;
  }

  public dispose(): void {
    if (!this.isDisposed()) {
      this.#value = undefined;
    }
  }
}

type MaybeInput<T> = T | null | undefined | Some<T> | None;

class Maybe<T> implements Serializeable<T>, Disposable {
  #value: Some<T> | None;

  private constructor(value?: MaybeInput<T>) {
    if (value === null || value === undefined) {
      this.#value = None.create();
    } else if (value instanceof Some) {
      this.#value = value;
    } else if (value instanceof None) {
      this.#value = value;
    } else {
      this.#value = Some.create(value);
    }
  }

  public static create<T>(value?: MaybeInput<T>) {
    return new Maybe<T>(value);
  }

  public isSome(): boolean {
    return this.#value instanceof Some;
  }

  public isNone(): boolean {
    return this.#value instanceof None;
  }

  public toJS(): any {
    return this.#value.toJS();
  }

  public isDisposed(): boolean {
    return this.isNone();
  }

  public dispose(): void {
    if (!this.isDisposed()) {
      this.#value = None.create();
    }
  }
}

type EntityMapValues<T> = {
  [key: string]: Maybe<T>;
};

type EntityMapIteratee<T> = (value: Maybe<T>, key: string) => any;

class EntityMap<T> implements Serializeable<T>, Disposable {
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

type EntityListValues<T> = Maybe<T>[];

type EntityListIteratee<T> = (value: Maybe<T>, index: number) => any;

class EntityList<T> implements Serializeable<T>, Disposable {
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

const entityMap = EntityMap.create<string>({
  A: Maybe.create('A'),
  B: Maybe.create('B'),
  C: Maybe.create(),
});

console.log(entityMap.toJS());
entityMap.dispose();

const entityList = EntityList.create<string>([
  Maybe.create('A'),
  Maybe.create('B'),
  Maybe.create(),
]);

console.log(entityList.toJS());
entityList.dispose();

// Iterfaces
// Types
// Metadata
