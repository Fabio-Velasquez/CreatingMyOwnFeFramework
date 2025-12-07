import {destroyDOM} from './destroy-dom'
import {mountDOM} from './mount-dom'
import {Dispatcher} from "./dispatcher";

/**
 *
 * @param state inital state of the appplication
 * @param view the top level component of the app
 * @param reducers object that maps command names to reducer functions
 * @returns {{mount(*): void, unmount(): void}}
 */
export function createApp({state, view,  reducers = {}}) {
    let parentEl = null;
    let vdom = null;

    // created the dispatcher object so we can render view based on interactions
    const dispatcher = new Dispatcher();
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)];


    function emit(eventName, payload) {
        dispatcher.dispatch(eventName, payload);
    }

    for (const actionName in reducers) {
        const reducer = reducers[actionName];

        const subs = dispatcher.subscribe(actionName, (payload) => {
            state = reducer(state, payload);
        });
        subscriptions.push(subs);
    }

    /**
     * renders the view, it will check if vdom exists destroys the DOM view
     * and process to regenerate the new DOM view.
     */
    function renderApp() {
        if (vdom) {
          destroyDOM(vdom);
        }

        vdom = view(state, emit);
        mountDOM(vdom, parentEl)
    }
    /*
    returns an object with methods to mount and unmount DOM
     */
    return {
        mount(_parentEl) {
            parentEl = _parentEl;
            renderApp();
        },
        unmount() {
            destroyDOM(vdom)
            vdom = null
            subscriptions.forEach((unsubscribe) => unsubscribe())
        },
    };
}