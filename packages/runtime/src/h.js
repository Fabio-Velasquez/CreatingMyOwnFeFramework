import {withoutNulls} from './utils/arrays.js'

const NODE_TEXT_HOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
/**
 * Constant Representation of our Virtual DOM TYPES
 * @type {{TEXT: string, ELEMENT: string, FRAGMENT: string}}
 */
export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
}

/**
 *
 * @param str element's text
 * @returns {{type: string, text: *}} v dom node for text elements
 */
export function hString(str) {
    return  {type: DOM_TYPES.TEXT, text: str};
}

/**
 *
 * @param vNodes an array of virtual nodes
 * @returns {{type: string, children: *}} a container for an array of virtual nodes
 */
export function hFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes))
    };
}

/**
 *
 * @param children
 * @returns {*}
 */
function mapTextNodes(children) {
    return children.map((child) => {
        typeof child === 'string' && hString(child) !== null
    }) ;
}

/**
 * hyperscript to return virtual nodes
 * @param tag html tag element name
 * @param props attributes of respected tag
 * @param children node's child elements
 */
export function h(tag, props = {}, children = []) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
    }
}




h('form', { class: 'login-form', action: 'login' }, [
    h('input', { type: 'text', name: 'user' }),
    h('input', { type: 'password', name: 'pass' }),
    h('button', { on: { click: 'login' } }, ['Log in'])
])
hFragment([
    h('h1', {class: 'title'}, ['My Counter']),
    h('div', {class: 'container'},
        [
                h('button', {},['decrement']),
                h('span',{},['0'])
                ]
        )
    ]);

export function lipsum(numOfParagraphs = 0) {
    const nodes = [];
    for (let i = 0; i <= numOfParagraphs; i++) {
        nodes.push(h('p',{},[NODE_TEXT_HOLDER]));
    }
    // GH solution: Array(numOfParagraphs).fill(h('p', {}, []));
    return hFragment(nodes);

}

function MessageComponent(level = null, message = null) {
    if(level === null || message === null) return null;
    const classAttr = `message message--${level}`;
    return h('div', { class:  classAttr}, [
        h('p',{},[message])
    ]);
}
