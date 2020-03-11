declare let ga: Function;

/**
 * Decorator - accepts event initiator and descriptions strings then extracts decorated fn params and sends 
 * the 3 elements to analytics 
 * @param eventInitiator e.g. 'dashbard-date-select'
 * @param eventDescription 'changing selected timespan'
 */
export function SendAnalytics(eventInitiator: string, eventDescription: string) {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            sendEventDataToAnalytics(eventInitiator, eventDescription, args)
            const result = original.apply(this, args);
            return result;
        };

        return descriptor;
    };
}

/**
 * Send data to analytics
 * @param eventPayload arguments from decorated fn
 */
function sendEventDataToAnalytics(eventInitiator: string, eventDescription: string, eventPayload: any[]) {
    if((<any>window).ga){
        (<any>window).ga('send', 'event', { eventInitiator, eventDescription, eventPayload });
    }
}