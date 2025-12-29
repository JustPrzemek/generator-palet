export class Maybe<T> {
  static just<T>(a: T): Maybe<T> {
    return new Just(a);
  }

  static nothing<T>(): Maybe<T> {
    return new Nothing<T>();
  }

  static fromNullable<T>(a: T | null | undefined): Maybe<T> {
    return a !== null && a !== undefined ? Maybe.just(a) : Maybe.nothing<T>();
  }

  static of<T>(a: T): Maybe<T> {
    return Maybe.just(a);
  }

  get isNothing(): boolean {
    return false;
  }

  get isJust(): boolean {
    return false;
  }

  map<R>(f: (wrapped: T) => R): Maybe<R> {
      return Maybe.nothing();
  }
    
  getOrElse(defaultValue: T): T {
      return defaultValue;
  }
}

class Just<T> extends Maybe<T> {
  private _value: T;

  constructor(value: T) {
    super();
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  map<R>(f: (wrapped: T) => R): Maybe<R> {
    return Maybe.fromNullable(f(this._value));
  }

  getOrElse(_defaultValue: T): T {
    return this._value;
  }

  get isJust(): boolean {
    return true;
  }
}

class Nothing<T> extends Maybe<T> {
  map<R>(_f: (wrapped: T) => R): Maybe<R> {
    return Maybe.nothing();
  }

  getOrElse(defaultValue: T): T {
    return defaultValue;
  }

  get value(): never {
    throw new TypeError("Cannot extract value from Nothing");
  }

  get isNothing(): boolean {
    return true;
  }
}
