function Utils() {
}

// Define read-only property EMPTY_STRING
Object.defineProperty(Utils, "EMPTY_STRING", {
  value: "",
  writable: false,
  configurable: false
});

export default Utils;
