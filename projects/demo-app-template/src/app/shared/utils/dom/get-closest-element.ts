/**
 * Gets closest element by selector i.e. {@link Element.closest}
 */
export function getClosestElement(element: Element, selector: string): Element | null {
    const closest = Element.prototype.closest;

    if (closest) {
        return closest.call(element, selector);
    }

    const matchedSelector =  Element.prototype.matches || (Element.prototype as any).msMatchesSelector;

    do {
        if (matchedSelector.call(element, selector)) {
            return element;
        }

        (element as Element | null) = element.parentElement;
    } while (element !== null);

    return null;
}
