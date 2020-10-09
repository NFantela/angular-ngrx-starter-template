
/** Decorator for pure methods in our classses
 * e.g.
 * @PureMemoization
  private filter(items: readonly string[], value: string): readonly string[] {
  return items.filter(item => 
    item.toLowerCase().includes(value.toLowerCase())
  );
}
 */

export function PureMemoization<T>(
    _target: Object,
    propertyKey: string,
    { enumerable, value }: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> {
    if (typeof value !== "function") {
      throw new Error("Pure can only be used with functions or getters");
    }
    // passed fn
    const original = value;
  
    return {
      enumerable,
      get(): T {
        let previousArgs: ReadonlyArray<any> = [];
        let previousResult: any;
  
        const patched = (...args: Array<any>) => {
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