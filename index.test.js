const StoreWrap = require("./index");

//console.log("wrapper", StoreWrap);
//console.log("handle", StoreWrap.generateHandle);

const testKeys = {
  x: "jest-key-x",
  y: "jest-key-y",
  z: "jest-key-z",
};

const testObjects = {
  x: { a: 1, b: 2 },
  y: { data: { more: [2, 3, 4, 5] } },
  z: { hello: "world", this: "is", a: "test" },
  not: { text: { something: 4 } },
};

["localStorage", "sessionStorage"].forEach((storeType) => {
  test(`${storeType} get/set`, () => {
    const store = StoreWrap(storeType);

    Object.keys(testKeys).forEach((k) => {
      store.set(testKeys[k], testObjects[k]);
      expect(store.get(testKeys[k])).toEqual(testObjects[k]);
      expect(store.get(testKeys[k])).not.toEqual(testObjects.not);
    });

    expect(store.keys()).toHaveLength(3);
  });

  test(`${storeType} remove`, () => {
    const store = StoreWrap(storeType);

    Object.keys(testKeys).forEach((k) => {
      store.set(testKeys[k], testObjects[k]);
    });

    expect(store.remove(testKeys.x)).toBe(true);
    expect(store.get(testKeys.x)).toBeNull();
    expect(store.keys()).toHaveLength(2);
  });

  test(`${storeType} clear`, () => {
    const store = StoreWrap(storeType);

    Object.keys(testKeys).forEach((k) => {
      store.set(testKeys[k], testObjects[k]);
    });

    expect(store.clear()).toBe(true);
    expect(store.get(testKeys.x)).toBeNull();
    expect(store.keys()).toHaveLength(0);
  });

  test(`${storeType} generate handle`, () => {
    const jestStore = StoreWrap.generateHandle(storeType, "jest-key-test");
    expect(jestStore.set("something")).toBe(true);
    expect(jestStore.get()).toEqual("something");
    expect(jestStore.remove()).toBe(true);
    expect(jestStore.get()).toBeNull();
  });
});
