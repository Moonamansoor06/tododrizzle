import { sql } from '@vercel/postgres';
import { db } from '@/lib/drizzle';
import { BooksTable, Book, NewBook, 
  CustomerTable, Customer, NewCustomer,
   AuthorTable, Author, NewAuthor, 
   OrderTable, Order, NewOrder } from './drizzle';

const newBooks: NewBook[] = [
  {
    bookname: 'The Great Gatsby',
    booktype: 'Fiction',
    author: 'F. Scott Fitzgerald',
    price: '20',
    qty: '10',
    isbn: '978-3-16-148410-0',
  },
  {
    bookname: 'To Kill a Mockingbird',
    booktype: 'Fiction',
    author: 'Harper Lee',
    price: '18',
    qty: '5',
    isbn: '978-3-16-148410-1',
  },
  {
    bookname: '1984',
    booktype: 'Fiction',
    author: 'George Orwell',
    price: '22',
    qty: '15',
    isbn: '978-3-16-148410-2',
  },
];

const newCustomers: NewCustomer[] = [
  {
    customername: 'John Doe',
    customeremail: 'johndoe@example.com',
  },
  {
    customername: 'Jane Doe',
    customeremail: 'janedoe@example.com',
  },
  {
    customername: 'Bob Smith',
    customeremail: 'bobsmith@example.com',
  },
];

const newAuthors: NewAuthor[] = [
  {
    authorname: 'F. Scott Fitzgerald',
  },
  {
    authorname: 'Harper Lee',
  },
  {
    authorname: 'George Orwell',
  },
];

const newOrders: NewOrder[] = [
  {
    bookid: 1,
    customerid: 1,
    qty: '2',
  },
  {
    bookid: 2,
    customerid: 2,
    qty: '1',
  },
  {
    bookid: 3,
    customerid: 3,
    qty: '3',
  },
];

export async function seed() {
    // Create table with raw SQL
    const createBooksTable = await sql.query(`
        CREATE TABLE IF NOT EXISTS books (
          id SERIAL PRIMARY KEY,
          bookname VARCHAR(255) NOT NULL,
          booktype VARCHAR(255) NOT NULL,
          author VARCHAR(255)  NOT NULL,
          qty INT,
          price NUMERIC(10,2) NOT NULL,
          isbn VARCHAR(255),
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(`Created "books" table`)
  
    const insertedBooks: NewBook[] = await db
      .insert(BooksTable)
      .values(newBooks)
      .returning()
    console.log(`Seeded ${insertedBooks.length} books`)
  
    const createOrdersTable = await sql.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      bookId INT NOT NULL,
      customerId INT NOT NULL,
      quantity INT NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`)
console.log(`Created "orders" table`)
const insertedOrders: NewOrder[] = await db
.insert(OrderTable)
.values(newOrders)
.returning()
console.log(`Seeded ${insertedOrders.length} orders`)

const createCustomersTable = await sql.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`)
console.log(`Created "customers" table`)
const insertedCustomer: NewCustomer[] = await db
.insert(CustomerTable)
.values(newCustomers)
.returning()
console.log(`Seeded ${insertedCustomer.length} customer`)

const createAuthorsTable = await sql.query(`
    CREATE TABLE IF NOT EXISTS authors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      bio TEXT,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`)
console.log(`Created "authors" table`)
const insertedAuthor: NewAuthor[] = await db
.insert(AuthorTable)
.values(newAuthors)
.returning()
console.log(`Seeded ${insertedBooks.length} users`)
    return {
      createBooksTable,
      insertedBooks,
      createAuthorsTable,
      createCustomersTable,
      createOrdersTable,
      insertedAuthor,
      insertedCustomer,
      insertedOrders
}

}


// import { sql } from '@vercel/postgres'
// import { db } from '@/lib/drizzle'
// import { UsersTable, User, NewUser } from './drizzle'

// const newUsers: NewUser[] = [
//   {
//     name: 'Guillermo Rauch',
//     email: 'rauchg@vercel.com',
//     image:
//       'https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg',
//   },
//   {
//     name: 'Lee Robinson',
//     email: 'lee@vercel.com',
//     image:
//       'https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg',
//   },
//   {
//     name: 'Steven Tey',
//     email: 'stey@vercel.com',
//     image:
//       'https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg',
//   },
// ]

// export async function seed() {
//   // Create table with raw SQL
//   const createTable = await sql.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         image VARCHAR(255),
//         "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       );
//   `)
//   console.log(`Created "users" table`)

//   const insertedUsers: User[] = await db
//     .insert(UsersTable)
//     .values(newUsers)
//     .returning()
//   console.log(`Seeded ${insertedUsers.length} users`)

//   return {
//     createTable,
//     insertedUsers,
//   }
//}
