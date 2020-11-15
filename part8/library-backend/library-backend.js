require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`
const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result
      if (args.genre) {
        result = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      } else {
        result = await Book.find({}).populate('author')
      }
      return result
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const result = authors.map(async author => {
        const books = await Book.find({ author: author.id })
        const finalAuthor = await author.toJSON()
        return { ...finalAuthor, bookCount: books.length }
      })
      return await Promise.all(result)
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        author = await author.save()
      }
      const book = new Book({ ...args, author: author })
      const savedBook = await book.save()
      return savedBook.toJSON()
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
      await author.save()
      return author.toJSON()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
