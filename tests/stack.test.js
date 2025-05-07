const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

test('pop returns the correct element', () => {
    let expectedElement = "apple"; // exempelvärde
    stack.push(expectedElement); // lägg till expectedElement i stacken

    let poppedElement = stack.pop(); // sparar det borttagna elementet i poppedElement

    expect(poppedElement).toBe(expectedElement); // kontrollerar att poppedElement är det förväntade elementet
});