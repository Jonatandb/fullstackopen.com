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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}