
/** Decorator for pure methods in our classses
 * e.g.
 * @PureMemoization
  private filter(items: readonly string[], value: string): readonly string[] {
  return items.filter(item => 
    item.toLowerCase().includes(value.toLowerCase())
  );
  or lazy computation for getter : only once and never again e.g. credit card validity 
  @PureMemoization
    get valid(): boolean {
    return validate(this.cardNumber);
  }
}
 */

function PureMemoization<T>(
  _: object,
  propertyKey: string,
  { get, enumerable, value }: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
  // if we have a getter fn for property
  // lazy computation only when called 
  if (get) {
    return {
      enumerable,
      get(): T {
        const currentValue = get.call(this);

        Object.defineProperty(this, propertyKey, {
          enumerable,
          value: currentValue
        });

        return currentValue;
      }
    };
  }

  if (typeof value !== "function") {
    throw new Error("Pure can only be used with functions or getters");
  }
  // if we are decorating a function
  const original = value;

  return {
    enumerable,
    get(): T {
      let previousArgs: ReadonlyArray<unknown> = [];
      let previousResult: any;

      const patched = (...args: Array<unknown>) => {
        if (
          previousArgs.length === args.length &&
          args.every((arg, index) => arg === previousArgs[index])
        ) {
          return previousResult;
        }

        previousArgs = args;
        previousResult = original(...args);

        return previousResult;
      };

      Object.defineProperty(this, propertyKey, {
        value: patched
      });

      return patched as any;
    }
  };
}