// Node 25 removed buffer.SlowBuffer. Next.js 12 ships a bundled jsonwebtoken
// that reads SlowBuffer.prototype at load time, so restore the alias first.
const buffer = require('buffer');

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer;
}

if (typeof global !== 'undefined' && !global.SlowBuffer) {
  global.SlowBuffer = buffer.Buffer;
}
