// a simple wrapper around local storage
function StoreWrap(storeType) {
  // check if local storage works
  if (typeof Storage == "undefined" || !(storeType in window)) {
    console.log("Storage unavilable");
    return null;
  }

  // get store reference
  const store = window[storeType];

  // set to storage
  function set(key, value) {
    const strValue = JSON.stringify(value);
    try {
      store.setItem(key, strValue);
      return true;
    } catch (err) {
      return null;
    }
  }

  // get from storage
  function get(key) {
    try {
      return JSON.parse(store.getItem(key));
    } catch (err) {
      return null;
    }
  }

  // remove a key from storage
  function remove(key) {
    try {
      store.removeItem(key);
      return true;
    } catch (err) {
      return null;
    }
  }

  // clear all values
  function clear() {
    try {
      store.clear();
      return true;
    } catch (err) {
      return null;
    }
  }

  // get all keys
  function keys() {
    try {
      return Object.keys(store);
    } catch (err) {
      return null;
    }
  }

  return {
    set,
    get,
    remove,
    clear,
    keys,
  };
}

// generate a storage object specific to a key
// key wrapped in closure
const generateHandle = (storeType, key) => {
  const instance = StoreWrap(storeType);

  if (instance) {
    return {
      set: (value) => instance.set(key, value),
      get: () => instance.get(key),
      remove: () => instance.remove(key),
    };
  }
  return null;
};

module.exports = StoreWrap;
module.exports.generateHandle = generateHandle;
