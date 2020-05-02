# store-wrap

![npm bundle size](https://img.shields.io/bundlephobia/min/store-wrap)
![npm](https://img.shields.io/npm/v/store-wrap)

A simple wrapper around browser storage with some useful utilities.

But why?

There are several feature rich wrappers around browser storage so this one's not going in that direction. It aims to be simple, minimal and covers a specifc yet common use case that I've encountered.

Apart from the interface to storage it allows you to create a storage instance for a specific key. Essentially a key wrapped in closure to the storage interface, see example below.

    npm i store-wrap

    const StoreWrap = require("store-wrap");

    // create a storage wrapper
    // accepts storage type as param
    // either "localStorage"  or "sessionStorage"
    const store = StoreWrap('localStorage');   // returns an object with store actions

    //NOTE: all functions returns null on failure/exceptions

    // set value
    store.set('demo-key',{ a: 2}); // returns: true

    // get value
    store.get('demo-key'); // returns: {a : 2}

    // remove key
    store.remove('demo-key'); // returns: true

    // get all keys
    store.keys(); // returns: ["demo-key']

    // clear all keys
    store.clear(); // returns: true


    // say you want to store user preferences in localStorage
    // and the info is used at multiple places and you don't want to carry the key around
    // tada, create a store interface just for that key
    // accepts two params, type of storage and key name
    const prefStore = StoreWrap.generateHandle('localStorage', 'app-user-pref');

    prefStore.set({ theme: "dark", sidebar: false }); // returns: true

    prefStore.get(); // returns: { theme: "dark", sidebar: false }

    prefStore.remove() // returns: true

    prefStore.get(); // returns: null

That's all folks.
