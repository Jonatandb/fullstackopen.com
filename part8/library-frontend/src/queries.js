import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query {
        allAuthors  {
            name
            id
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            id
            genres
            author {
                name
                id
                born
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            title
            published
            genres
        }
    }
`

export const SET_AUTHOR_BIRTHYEAR = gql`
    mutation update_author($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
        }
    }
`