import { sql } from '@vercel/postgres';
import { db } from '@/lib/drizzle';
import { TodoTable, NewTodo,  } from './drizzle';

const newTodos: NewTodo[] = [
  {
   name:'do anything 1',
   completed:false
  },
  {
   name:'do anything 2',
   completed:true
  },
  {
   name:'do anything 3',
   completed:false
  },
  {
   name:'do anything 4',
   completed:false
  },
]
export async function seed() {
    
    const createTodoTable = await sql.query(`
        CREATE TABLE IF NOT EXISTS todo (
          id UUID PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          completed:BOOLEAN,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(`Created "todo" table`)
  
    const insertedTodo: NewTodo[] = await db
      .insert(TodoTable)
      .values(newTodos)
      .returning()
    console.log(`Seeded ${insertedTodo.length} books`)
  
    return {
      createTodoTable,
      insertedTodo,
}

}

