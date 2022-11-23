import assert from 'assert';

const GUARD = Symbol('Empty');
const VALUES = Symbol('Values');

export class ValueObject {
  [VALUES]: any;

  canCreateObjectGuard(values: unknown): {
    canCreate: boolean;
    exceptionToThrow?: Error;
  } {
    return { canCreate: true };
  }

  static create<Type extends ValueObject>(values: Partial<Type> = {}): Type {
    const data = new this(GUARD);

    const { canCreate, exceptionToThrow } = data.canCreateObjectGuard(values);
    if (!canCreate) {
      if (!exceptionToThrow) throw new Error('Cannot create value object!');

      throw exceptionToThrow;
    }

    Object.defineProperty(data, VALUES, { value: values });
    Object.seal(data);
    Object.assign(data, values);
    return Object.freeze(data) as Readonly<Type>;
  }

  static createDefault<Type extends ValueObject>(): Type {
    const data = new this(GUARD);

    Object.defineProperty(data, VALUES, { value: {} });
    Object.seal(data);
    Object.assign(data, {});
    return Object.freeze(data) as Readonly<Type>;
  }

  constructor(values: unknown) {
    if (values !== GUARD) {
      throw new Error(
        'Use ' +
          this.constructor.name +
          '.create(...) instead of `new` operator',
      );
    }
  }

  copy(values: Partial<this>): this {
    const composed = Object.assign({}, this[VALUES], values);
    return (this.constructor as any).create(composed);
  }

  // Note : the second argument is here to enable array comparison
  // eslint-disable-next-line complexity
  equals(other: this): boolean {
    try {
      assert.deepStrictEqual(other, this);
      return true;
    } catch {
      return false;
    }
  }
}
