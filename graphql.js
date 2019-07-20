const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');

const db = require('./db');

const Book = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        author: {
            type: Author,
            resolve(source){
                return db.authors.find(author => author.id === source.authorId);
            }
        }
    })
});

const Author = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(Book),
            resolve(source){
                return db.books.filter(book => book.authorId === source.id);
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'QueryRoot',
        fields: () => ({
            book: {
                type: new GraphQLList(Book),
                args: {
                    id: { type: GraphQLInt }
                },
                resolve(source, args, req, field){
                    if('id' in args)
                        return [db.books.find(book => book.id === args.id)];
                    else
                        return db.books;
                }
            },
            author: {
                type: new GraphQLList(Author),
                args: { 
                    id: { type: GraphQLInt }
                },
                resolve(source, args, req, field){
                    if('id' in args)
                        return [db.authors.find(author => author.id === args.id)];
                    else
                        return db.authors
                }
            }
        })
    }),
    mutation: new GraphQLObjectType({
        name: 'MutationRoot',
        fields: () => ({
            createAuthor: {
                type: Author,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve(source, args, req, field){
                    let author = {
                        id: (db.authors[db.authors.length - 1] || {id: 0}).id + 1,
                        name: args.name
                    }
                    db.authors.push(author);
                    return author;
                }
            },
            createBook: {
                type: Book,
                args: {
                    title: { type: new GraphQLNonNull(GraphQLString) },
                    authorId: { type: new GraphQLNonNull(GraphQLInt) }
                },
                resolve(source, args, req, field){
                    let book = {
                        id: (db.books[db.authors.length - 1] || {id: 0}).id + 1,
                        title: args.title,
                        authorId: args.authorId
                    }
                    db.books.push(book);
                    return book;
                }
            }
        })
    })
});