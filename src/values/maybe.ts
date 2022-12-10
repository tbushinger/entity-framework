import { Path } from '../types/common';
import { IMaybe, INone, ISome, MaybeInput } from '../types/value';
import { convertAny } from './utils';

export class None implements INone {
  #value: any = null;

  private static instance: None;

  public static create(): None {
    if (!this.instance) {
      this.instance = new None();
    }

    return this.instance;
  }

  public unwrap(): null {
    return this.#value;
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

  public unwrap(): T {
    return this.#value;
  }

  public toJS(): any {
    const value: any = this.#value;
    return value && value.toJS ? value.toJS() : value;
  }

  public isDisposed(): boolean {
    return this.#value !== undefined;
  }

  public dispose(): void {
    if (!this.isDisposed()) {
      const value: any = this.#value;
      if (value && value.dispose) {
        value.dispose();
      }

      this.#value = undefined;
    }
  }
}

export class Maybe<T> implements IMaybe<T> {
  #value: ISome<T> | INone;

  private constructor(value?: MaybeInput<T>) {
    this._setValue(value);
  }

  private _setValue(value?: MaybeInput<T>): Maybe<T> {
    this.#value = convertAny(value);

    return this;
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

  public unwrap(): T {
    return this.#value.unwrap();
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

  public hasPath(): boolean {
    return true;
  }

  public setIn(value: MaybeInput<T>, _path?: Path): Maybe<T> {
    return this._setValue(value);
  }

  public getIn(_path?: Path): ISome<T> | INone {
    return this.#value;
  }
}
