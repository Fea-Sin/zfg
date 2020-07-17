global.requestAnimationFrame = global.requestAnimationFrame || function requestAnimationFrame(cb) {
  return setTimeout(cb, 0);
};
function noOp () { }
if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: noOp})
}

const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })
