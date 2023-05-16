import { pgTable, serial, text, numeric, uniqueIndex } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

// Define the Books table
export const BooksTable = pgTable(
  'books',
  {
    id: serial('id').primaryKey(),
    bookname: text('bookname').notNull(),
    booktype: text('booktype').notNull(),
    author: text('author').notNull(),
    price: numeric('price').notNull(),
    qty: numeric('qty').notNull(),
    isbn: text('isbn').notNull(),
  },
  (books) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(books.isbn),
    };
  }
);

// Define the Customer table
export const CustomerTable = pgTable(
  'customer',
  {
    customerid: serial('customerid').primaryKey(),
    customername: text('customername').notNull(),
    customeremail: text('customeremail').notNull(),
  },
  (customer) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(customer.customeremail),
    };
  }
);

// Define the Author table
export const AuthorTable = pgTable(
  'author',
  {
    authorid: serial('authorid').primaryKey(),
    authorname: text('authorname').notNull(),
  },
  (author) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(author.authorid),
    };
  }
);

// Define the Order table
export const OrderTable = pgTable(
  'order',
  {
    orderid: serial('orderid').primaryKey(),
    bookid: serial('bookid').notNull(),
    customerid: serial('customerid').notNull(),
    authorid: serial('authorid').notNull(),
    qty: numeric('qty').notNull(),
  },
  (order) => {
    return { uniqueIdx: uniqueIndex('unique_idx').on(order.orderid)};
  }
);

// Export the types for each table
export type Book = InferModel<typeof BooksTable>;
export type NewBook = InferModel<typeof BooksTable, 'insert'>;

export type Customer = InferModel<typeof CustomerTable>;
export type NewCustomer = InferModel<typeof CustomerTable, 'insert'>;

export type Author = InferModel<typeof AuthorTable>;
export type NewAuthor = InferModel<typeof AuthorTable, 'insert'>;

export type Order = InferModel<typeof OrderTable>;
export type NewOrder = InferModel<typeof OrderTable, 'insert'>;

// Connect to Vercel Postgres
export const db = drizzle(sql);



















// import {
//   pgTable,
//   serial,
//   text,
//   timestamp,
//   uniqueIndex,
// } from 'drizzle-orm/pg-core'
// import { InferModel } from 'drizzle-orm'
// import { sql } from '@vercel/postgres'
// import { drizzle } from 'drizzle-orm/vercel-postgres'

// export const UsersTable = pgTable(
//   'users',
//   {
//     id: serial('id').primaryKey(),
//     name: text('name').notNull(),
//     email: text('email').notNull(),
//     image: text('image').notNull(),
//     createdAt: timestamp('createdAt').defaultNow().notNull(),
//   },
//   (users) => {
//     return {
//       uniqueIdx: uniqueIndex('unique_idx').on(users.email),
//     }
//   }
// )

// export type User = InferModel<typeof UsersTable>
// export type NewUser = InferModel<typeof UsersTable, 'insert'>

// // Connect to Vercel Postgres
// export const db = drizzle(sql)
