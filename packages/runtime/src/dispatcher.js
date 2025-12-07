/**
 *
 * Dispatcher responsible to associate commands
 * with handler function through subscription logic which in turn
 * the handler will call the respected command logic
 *
 */
export class Dispatcher {
    // tracks all cmd:consumer subscriptions
    #subs = new Map();
    #afterHandlers = []

    /**
     * Creates an empty array of handlers if none exist
     * adds handler to the array
     * returns empty function if handler exists
     * or
     * returns function to unregister handler
     * @param commandName cmd name application developer will use
     * @param handler handler function logic to execute command logic
     * @returns {(function(): void)|*|(function())}
     */
    subscribe(commandName, handler) {
        if(!this.#subs.has(commandName)) {
            this.#subs.set(commandName,  []);
        }

        const handlers = this.#subs.get(commandName);
        /*
        return an empty function since handler is already registered
        better to return an empty function instead of ubsubscribe the handler
        app developer may call the same handler more than once.
         */
        if(handlers.includes(handler)) {
            return () => {};
        }
        handlers.push(handler);
        return () => {
            const idx = handlers.indexOf(handler);
            handlers.splice(idx, 1);
        };
    }

    /**
     * executed after every command to notify the renderer
     * @param handler handler event
     * @returns {(function(): void)|*} unsub handler when called.
     */
    afterEveryCommand(handler) {
        this.#afterHandlers.push(handler);
        return () => {
            const idx = this.#afterHandlers.indexOf(handler);
            this.#afterHandlers.splice(idx, 1);
        };
    }

    /**
     * dispatches the command name with respected handler function
     * passed payload to create new state.
     * Calls after handlers to rerender the view.
     * @param commandName
     * @param payload
     */
    dispatch(commandName, payload) {
        if(this.#subs.has(commandName)) {
            this.#subs.get(commandName).forEach((handler) => {
                handler(payload);
            })
        } else {
            console.warn(`no handlers for cmd: ${commandName}`);
        }
        this.#afterHandlers.forEach((handler) => {handler();})
    }
}