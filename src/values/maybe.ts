import { Path } from '../types/common';
import { IMaybe, INone, ISome, MaybeInput } from '../types/value';
import { convertScalarValue } from './utils';

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
  #value: ISome<T> | INone;

  private constructor(value?: MaybeInput<T>) {
    this._setValue(value);
  }

  private _setValue(value?: MaybeInput<T>): Maybe<T> {
    this.#value = convertScalarValue(value);

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

  public set(value: MaybeInput<T>): Maybe<T> {
    return this._setValue(value);
  }

  public setIn(_path: Path, value: MaybeInput<T>): Maybe<T> {
    return this._setValue(value);
  }

  public get(): ISome<T> | INone {
    return this.#value;
  }

  public getIn(_path: Path): ISome<T> | INone {
    return this.#value;
  }
}
