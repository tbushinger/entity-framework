import { Path } from '../types/common';
import { Maybe, None, Some } from '../types/maybe';

export class NoneScalar implements None {
  #value: any = null;

  private static instance: NoneScalar;

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

  public static create(): NoneScalar {
    if (!this.instance) {
      this.instance = new NoneScalar();
    }

    return this.instance;
  }
}

export class SomeScalar implements Some {
  #value: any;

  private constructor(value: any) {
    this.#value = value;
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

  public static create(value: any): SomeScalar {
    return new SomeScalar(value);
  }
}

export class MaybeScalar implements Maybe {
  #value: SomeScalar | NoneScalar = NoneScalar.create();

  private constructor(value?: any) {
    this.#value = this._setValue(value);
  }

  private _setValue(value?: any): SomeScalar | NoneScalar {
    if (value === null || value === undefined) {
      return NoneScalar.create();
    } else if (value instanceof SomeScalar) {
      return value;
    } else if (value instanceof NoneScalar) {
      return value;
    } else if (value instanceof MaybeScalar) {
      return value.unwrap();
    }

    return SomeScalar.create(value);
  }

  public isSome(): boolean {
    return this.#value instanceof SomeScalar;
  }

  public isNone(): boolean {
    return this.#value instanceof NoneScalar;
  }

  public unwrap(): SomeScalar | NoneScalar {
    return this.#value;
  }

  public toJS(): any {
    return this.#value.toJS();
  }

  public isDisposed(): boolean {
    return this.isNone();
  }

  public dispose(): void {
    if (!this.isDisposed()) {
      this.#value = NoneScalar.create();
    }
  }

  public setIn(value: any, _path?: Path): MaybeScalar {
    this.#value = this._setValue(value);

    return this;
  }

  public getIn(_path?: Path): MaybeScalar {
    return this;
  }

  public static create(value?: any): MaybeScalar {
    return new MaybeScalar(value);
  }
}
