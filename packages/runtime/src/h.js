import {withoutNulls} from './utils/arrays'

/**
 * Constant Representation of our DOM TYPES
 * @type {{TEXT: string, ELEMENT: string, FRAGMENT: string}}
 */
export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
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