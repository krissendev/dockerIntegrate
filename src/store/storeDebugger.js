import { writable }                         from 'svelte/store';

export function createDebugStore(initialValue, name = 'store') {
    const { subscribe, set, update } = writable(initialValue);

    function loggedSet(value) {
        console.log(`Setting value ${value} in ${name} at`, new Error().stack);
        set(value);
    }

    function loggedUpdate(func) {
        update(currentValue => {
            const newValue = func(currentValue);
            console.log(`Updating value to ${newValue} in ${name} at`, new Error().stack);
            return newValue;
        });
    }

    return {
        subscribe,
        set: loggedSet,
        update: loggedUpdate
    };
}
