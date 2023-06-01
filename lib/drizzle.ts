import { pgTable ,serial, text, numeric, uniqueIndex, uuid, TimeConfig, boolean, timestamp, } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';


export const TodoTable = pgTable(
  'todo',
  {
    id: uuid('id').primaryKey().default(''),
    name: text('name').notNull(),
    completed: boolean('completed').notNull(),   
    created_at:timestamp('created_at').default(new Date)
  },
  (todo) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(todo.id),
    };
  }
);


export type Todo = InferModel<typeof TodoTable>;
export type NewTodo = InferModel<typeof TodoTable, 'insert'>;



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
