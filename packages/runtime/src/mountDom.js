import {DOM_TYPES, h} from "./h.js";
import {setAttributes} from "./attributes.js";
import {addEventListeners} from "./events.js";
import {JSDOM} from "jsdom";

/**
 * File Description:
 *  Supports the mounting process when give a virtual dom to convert it to a DOM object.
 *  functions depends on the Vdom object and
 *  the parent element which is the parent container html element
 *  that would be appended to
 *  Also supports attaching event listener and parent references to the respected DOM object.
 */

/**
 *  Create the respected Node type when
 *  mounting the vdom to the real dom
 * @param vdom virtual dom
 * @param parentEl the respected parent DOM element (most likely the body) to be attached to.
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

/**
 * creates a text DOM node which contains
 * a string and reference to real DOM object
 * @param vdom
 * @param parentEl
 */
function createTextNode(vdom, parentEl) {
    const {value} = vdom;
    const textNode = document.createTextNode(value);
    vdom.el = textNode;
    parentEl.append(textNode);
}

/**
 * an array of children tags consists of a fragment where the el property will refer to
 * the containing parent element and the children tags
 * will be mounted.
 * @param vdom
 * @param parentEl
 */
function createFragmentNodes(vdom, parentEl) {
    const { children } = vdom;
    vdom.el = parentEl;
    children.forEach(child => {
        mountDom(child, parentEl);
    });
}

/**
 * Creates the DOM object for element nodes like tags that have
 * properties class = 'btn'
 * event listeners  = 'click'
 * children tags i.e text: "Click Me"
 * @param vdom virtual node
 * @param parentEl Real dom reference
 */
function createElementNode(vdom, parentEl) {
    const {tag, props, children} = vdom;
    const element = document.createElement(tag);
    addProps(element, props, vdom);
    vdom.el = element;
    children.forEach(child => mountDom(child, element));
    parentEl.append(element);
}

/**
 *  adds attributs and event listernets to the newly created DOM object
 * @param element html tag
 * @param props attributes i.e class and event listeners
 * @param vdom virtual node
 */
function addProps(element, props, vdom) {
    const { on: events, ...attrs } = props
    vdom.listeners = addEventListeners(events, element);
    setAttributes(element, attrs);
}





const vdom = h('section', {} [
    h('h1', {}, ['My Blog']),
        h('p', {}, ['Welcome to my blog!'])
    ]);

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
global.document = dom.window.document;
global.window = dom.window;

mountDom(vdom, document.body);
// console.log(vdom)

