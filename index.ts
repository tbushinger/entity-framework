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

const none = None.create();
const some = Some.create<string>('hello');
console.log(Maybe.create().toJS());
console.log(Maybe.create(null).toJS());
console.log(Maybe.create(some).toJS());
console.log(Maybe.create(none).toJS());
console.log(Maybe.create<string>('Hello 2').toJS());
console.log(Maybe.create(none).isNone());
console.log(Maybe.create(some).isSome());
console.log(Maybe.create(some).isSome());
const maybe = Maybe.create(some);
maybe.dispose();
console.log(maybe.isSome());
