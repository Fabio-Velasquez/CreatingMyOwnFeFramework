
/**
 * sets all attributes to the respected tag i.e classes styles
 * and other special case attributes depending on tag
 * @param el html tag
 * @param attrs list of attributes of the respected html tag
 */
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
        setAttribute(el, name, value);
    }
}
/**
 * sets the class properties to tag name
 * @param el html tag
 * @param className can be an array of class names or just one className as String
 EXAMPLES
 - class: ['foo', 'bar', 'baz']
 - class: 'foo bar baz'
 */
function setClass(el, className) {
    el.className = '';

    if (typeof className === 'string') {
        el.className = className;
    }

    if(Array.isArray(className)) {
        el.classList.add(...className);
    }
}

/**
 * sets the css styles in the html tag as key value pairs
 * @param el html tag
 * @param name key name of css tag
 * @param value value pair name of associated key.
 */
export function setStyle(el, name, value) {
    el.style[name] = value;
}

/**
 *  remove css declarations of a tag
 * @param el html tag
 * @param name css declaration name
 */
export function removeStyle(el, name) {
    el.style[name] = null;
}

/**
 * set attributes base on 3 case
 * removing an attr if value is null
 * setting a custome data attribute
 * set the existing attribute in respected html dom element
 * @param el html tag
 * @param name atrributes key name
 * @param value attribute value name
 */
export function setAttribute(el, name, value) {
    if (value == null) {
        removeAttribute(el, name)
    } else if (name.startsWith('data-')) {
        el.setAttribute(name, value)
    } else {
        el[name] = value
    }
}

/**
 * removes attributes
 * @param el html tag
 * @param name attribute declaration key name
 */
export function removeAttribute(el, name) {
    el[name] = null
    el.removeAttribute(name)
}
