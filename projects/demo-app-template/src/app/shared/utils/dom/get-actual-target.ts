/** Gets the target of an event, accounting for Shadow DOM. */
function getTarget(event: Event): HTMLElement | null {
    // If an event is bound outside the Shadow DOM, the `event.target` will
    // point to the shadow root so we have to use `composedPath` instead.
    return (event.composedPath ? event.composedPath()[0] : event.target) as HTMLElement | null;
}