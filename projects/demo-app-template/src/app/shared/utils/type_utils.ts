import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

export function isUndefined(target: any): target is undefined {
  return target === undefined;
}

export function isNull(target: any): target is null {
  return target === null;
}

export function isArray(target: any): target is Array<any> {
  return Array.isArray(target);
}

export function isString(target: any): target is string {
  return typeof target === 'string';
}

export function isBoolean(target: any): target is boolean {
  return typeof target === 'boolean';
}

export function isNumber(target: any): target is number {
  return typeof target === 'number';
}

export function isObjectLike(target: any): target is object {
  return typeof target === 'object' && target !== null;
}

export function isObject(target: any): target is object {
  return isObjectLike(target) && !isArray(target);
}

export function isPlainObject(target: any): target is object {
  if (!isObject(target)) {
    return false;
  }

  const targetPrototype = Object.getPrototypeOf(target);
  return targetPrototype === Object.prototype || targetPrototype === null;
}

export function isFunction(target: any): target is Function {
  return typeof target === 'function';
}

export function isComponent(target: any) {
  return isFunction(target) && target.hasOwnProperty('ɵcmp');
}

export function hasOwnProperty(target: object, propertyName: string): boolean {
  return Object.prototype.hasOwnProperty.call(target, propertyName);
}


/** Typed fromEvent for window, document, element, general */
export interface EventTarget<E> {
  addEventListener(
    type: string,
    listener: ((evt: E) => void) | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener?: ((evt: E) => void) | null,
    options?: boolean | EventListenerOptions,
  ): void;
}

// Typing for Event with particular target
export type EventWith<E extends Event, T extends EventTarget<E>> = E & { readonly currentTarget: T;};

// Overload 1: Window
export function typedFromEvent<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  options?: AddEventListenerOptions
): Observable<EventWith<WindowEventMap[E], typeof target>>
// Overload 2: Document
export function typedFromEvent<E extends keyof DocumentEventMap>(
  target: Document,
  event: E,
  options?: AddEventListenerOptions
): Observable<EventWith<DocumentEventMap[E], typeof target>>
// Overload 3: Element
export function typedFromEvent<
  T extends Element,
  E extends keyof HTMLElementEventMap,
>(
  target: T,
  event: E,
  options?: AddEventListenerOptions
): Observable<EventWith<HTMLElementEventMap[E], typeof target>>
// Overload 4: General behavior
export function typedFromEvent<
  E extends Event,
  T extends EventTarget<EventWith<E, T>> = EventTarget<any>,
>(
  target: T,
  event: string,
  options?: AddEventListenerOptions
): Observable<EventWith<E, T>>
// Implementation
export function typedFromEvent<E extends Event>(
  target: EventTarget<E>,
  event: string,
  options: AddEventListenerOptions = {}
): Observable<E> {
  return fromEvent(target, event, options);
}