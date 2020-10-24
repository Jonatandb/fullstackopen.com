const dummy = require('../utils/list_helpers').dummy
const totalLikes = require('../utils/list_helpers').totalLikes
const favoriteBlog = require('../utils/list_helpers').favoriteBlog
const mostBlogs = require('../utils/list_helpers').mostBlogs
const mostLikes = require('../utils/list_helpers').mostLikes

test('dummy returns one', () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('favoriteBlog', () => {
    test('returns blog with most likes', () => {
        const blogs = [
            {
                title: "Full Stack Open 2020",
                author: "Jonatandb",
                likes: 12
            },
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 2
            }
        ]

        const result = favoriteBlog(blogs)
        const expected = blogs[0]
        expect(result).toEqual(expected)
    })
})

describe('mostBlogs', () => {
    test('return the author with the most blogs', () => {
        const blogs = [
            { author: 'Ada Lovelace', title: 'Wikipedia Page' },
            { author: 'Jonatandb', title: 'Full Stack' },
            { author: 'Jonatandb', title: 'Open 2020' },
            { author: 'Dan Abramov', title: 'The WET Codebase' },
            { author: 'Dan Abramov', title: 'Goodbye, Clean Code' },
            { author: 'Dan Abramov', title: 'My Decade in Review' }
        ]

        const expected = { author: 'Dan Abramov', blogs: 3 }

        const result = mostBlogs(blogs)

        expect(result).toEqual(expected)

    })
})

describe('mostLikes', () => {
    test('returns the author, whose blog posts have the largest amount of likes', () => {
        const blogs = [
            { author: 'Ada Lovelace', title: 'Wikipedia Page', likes: 20 },
            { author: 'Dan Abramov', title: 'The WET Codebase', likes: 20 },
            { author: 'Dan Abramov', title: 'Goodbye, Clean Code', likes: 20 },
            { author: 'Dan Abramov', title: 'My Decade in Review', likes: 20 },
            { author: 'Jonatandb', title: 'Full Stack', likes: 20 },
            { author: 'Jonatandb', title: 'Open 2020', likes: 20 }
        ]

        const expected = { author: 'Dan Abramov', likes: 60 }

        const result = mostLikes(blogs)

        expect(result).toEqual(expected)

    })
})