import {DOM_TYPES} from "./h";

/**
 *  Create the respected Node type when
 *  mounting the vdom to the real dom
 * @param vdom virtual dom
 * @param parentEl the respected parent element (most likly the body)
 */

export function mountDom(vdom, parentEl) {
    switch (vdom.type) {
        case DOM_TYPES.TEXT: {
            createTextNode(vdom,parentEl);
            break;
        }
        case DOM_TYPES.ELEMENT: {
            createElementNode(vdom, parentEl);
            break;
        }
        case DOM_TYPES.FRAGMENT: {
            createFragmentNodes(vdom,parentEl);
            break;
        }
        default: {
            throw new Error(`Can't mount DOM of typel: ${vdom.type}`);
        }
    }
}

function createTextNode(vdom, parentEl) {
    const {value} = vdom;
    const textNode = document.createTextNode(value);
    vdom.el = textNode;
    parentEl.append(textNode);
}
function createFragmentNode(vdom, parentEl) {
    const { children } = vdom;
    vdom.el = parentEl;
    children.forEach(child => {
        mountDom(child, parentEl);
    });
}
function createElementNode(vdom, parentEl) {
    const {tag, props, children} = vdom;
    const element = document.createElement(tag);
    addProps(element, props, vdom);
    vdom.el = element;
    children.forEach(child => mountDom(child, element));
    parentEl.append(element);
}

function addProps(element, props, vdom) {
    const { on: events, ...attrs } = props
    vdom.listeners = addEventListeners(events, element);
    setAttributes(el, attrs);
}


