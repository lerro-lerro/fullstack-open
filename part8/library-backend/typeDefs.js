const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
    friends: [Author!]!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
    
    addAsFriend(
      name: String!
    ): User
  }
  
  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
