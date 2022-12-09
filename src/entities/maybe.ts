import { IMaybe, INone, ISome, MaybeInput } from '../types/entity';

export class None implements INone {
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

export class Some<T> implements ISome<T> {
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

export class Maybe<T> implements IMaybe<T> {
  #value: ISome<T> | None;

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
