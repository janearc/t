// context.js — unitary T interpreter, heap, stack, and context
if (!global._T) {
    global._T = {
        stack: [],
        context: {},
        // optional init/reset helpers here
    };
}
module.exports = global._T;