// 노드 환경에서 globalThis는 global 객체, 브라우저 환경에서 globalThis는 window 객체를 가리킨다.
console.log(globalThis);
/*
<ref *1> Object [global] {
  global: [Circular *1],
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  structuredClone: [Function: structuredClone],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  atob: [Function: atob],
  btoa: [Function: btoa],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 49.26350003480911,
      nodeStart: 3.472100019454956,
      v8Start: 8.17059999704361,
      bootstrapComplete: 34.36070001125336,
      environment: 18.815500020980835,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1700811045442.48
  },
  fetch: [AsyncFunction: fetch]
}
*/
