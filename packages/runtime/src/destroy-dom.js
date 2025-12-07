

import { removeEventListeners } from './events'
import { DOM_TYPES } from './h'

/**
 * starts the unmounting process from the DOM
 * @param vdom virtual dom
 */
export function destroyDOM(vdom) {
    const { type } = vdom

    switch (type) {
        case DOM_TYPES.TEXT: {
            removeTextNode(vdom)
            break
        }

        case DOM_TYPES.ELEMENT: {
            removeElementNode(vdom)
            break
        }

        case DOM_TYPES.FRAGMENT: {
            removeFragmentNodes(vdom)
            break
        }

        default: {
            throw new Error(`Can't destroy DOM of type: ${type}`)
        }
    }

    delete vdom.el
}

/**
 * removing text nodes from DOM
 * @param vdom
 */
function removeTextNode(vdom) {
    const { el } = vdom
    el.remove()
}

/**
 * removes element v nodes by removing dom reference and
 * recursively calling  destryoDom on children vdom nodes
 * removes listeners if present
 * @param vdom v dom ELEMENT node
 */
function removeElementNode(vdom) {
    const { el, children, listeners } = vdom

    el.remove()
    children.forEach(destroyDOM)

    if (listeners) {
        removeEventListeners(listeners, el)
        delete vdom.listeners
    }
}

/**
 * calls Destroy Dom for each child.
 * El element is not removed since for fragments
 * it indicates where children need to be mounted
 * @param vdom fragment v dom node consist of children v dom nodes
 */
function removeFragmentNodes(vdom) {
    const { children } = vdom
    children.forEach(destroyDOM)
}