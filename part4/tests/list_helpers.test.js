const dummy = require('../utils/list_helpers').dummy

test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
})