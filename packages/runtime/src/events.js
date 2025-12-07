/**
 *  attaches respected event name with handler to DOM object
 * @param eventName browser's event name as a key value
 * @param handler handler function logic as value for respected event
 * @param el DOM object with
 * @returns {*}
 */
export function addEventListener(eventName, handler, el) {
    el.addEventListener(eventName, handler);
    return handler;
}

/**
 * returns an object of eventNames with the respected handler function logic
 * EXAMPLE: {
 *   type: DOM_TYPES.ELEMENT,
 *   tag: 'button',
 *   props: {
 *     on: {
 *       mouseover: () => console.log('almost yay!'),
 *       click: () => console.log('yay!') ,
 *       dblclick: () => console.log('double yay!'),
 *     }
 *   }
 * }
 * @param listeners event listeners
 * @param el html tag
 * @returns {{eventName: (dblclick) => {doSomethinCool}}
 */
export function addEventListeners(listeners = {}, el) {
    const addedListeners = {};
    Object.entries(listeners).forEach(([eventName, handler]) => {
        const listener = addEventListener(eventName, handler, el);
        addedListeners[eventName] = listener;
    });
    return addedListeners;
}

export function removeEventListeners(listeners = {}, el) {
    Object.entries(listeners).forEach(([eventName, handler]) => {
        el.removeEventListener(eventName, handler)
    })
}