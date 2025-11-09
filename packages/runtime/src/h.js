import {withoutNulls} from './utils/arrays'

const NODE_TEXT_HOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
/**
 * Constant Representation of our DOM TYPES
 * @type {{TEXT: string, ELEMENT: string, FRAGMENT: string}}
 */
export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
}

export function hString(str) {
    return  {type: DOM_TYPES.TEXT, text: str};
}

export function hFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes))
    };
}

function mapTextNodes(children) {
    return children.map((child) => {
        typeof child === 'string' && hString(child) !== null
    }) ;
}

/**
 *
 * @param tag
 * @param props
 * @param children
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
    h('button', { on: { click: login } }, ['Log in'])
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
