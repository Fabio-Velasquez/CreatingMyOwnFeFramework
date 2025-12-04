export function addEventListener(eventName, handler, el) {
    el.addEventListener(eventName, handler);
    return handler;
}

export function addEventListeners(listeners = {}, el) {
    const addedListeners = {};
    Object.entries(listeners).forEach(([eventName, handler]) => {
        const listener = addEventListener(eventName, handler, el);
        addedListeners[eventName] = listener;
    });
    return addedListeners;
}

function setClass(el, className) {
    el.className = '';
    if (typeof className === 'string') {
        el.className = className;
    }

    if(Array.isArray(className)) {
        el.classList.add(...className);
    }
}

export function setStyle(el, name, value) {
    el.style[name] = value;
}

export function removeStyle(el, name) {
    el.style[name] = null;
}


export function setAttributes(el, attrs) {
    const { class: className, style, ...otherAttrs} = attrs;
    if (className) {
        setClass(el, className);
    }
    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
           setStyle(el, prop, value);
        });
    }

    for (const [name, value] of Object.entries(otherAttrs)) {
        setAttributes(el, name, value);
    }
}
export function setAttribute(el, name, value) {
    if (value == null) {
        removeAttribute(el, name)
    } else if (name.startsWith('data-')) {
        el.setAttribute(name, value)
    } else {
        el[name] = value
    }
}


export function removeAttribute(el, name) {
    el[name] = null
    el.removeAttribute(name)
}

export function removeEventListeners(listeners = {}, el) {
    Object.entries(listeners).forEach(([eventName, handler]) => {
        el.removeEventListener(eventName, handler)
    })
}