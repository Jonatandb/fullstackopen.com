const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((sum, blog) => sum += blog.likes, 0)
}

const favoriteBlog = blogs => {
    const sortedBlogs = [...blogs].sort((a, b) => a.likes > b.likes ? 1 : -1)
    return sortedBlogs[sortedBlogs.length - 1]
}

// Receives an array of blogs as a parameter.
// Returns the author who has the largest amount of blogs.
// {
//     author: "Robert C. Martin",
//     blogs: 3
// }
const mostBlogs = blogs => {

    const blogsByAuthor = (total, author) => {

        const authorFounded = total.find(a => a.author === author.author)

        if (authorFounded) {

            authorFounded.blogs++
            return total

        } else {

            total.push({ author: author.author, blogs: 1 })
            return total
        }
    }

    const authorList = blogs.reduce(blogsByAuthor, [])

    const authorSortedList = [...authorList].sort((a, b) => a.blogs > b.blogs ? -1 : 1)

    return authorSortedList[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}