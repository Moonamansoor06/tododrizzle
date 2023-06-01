
import { NextRequest, NextResponse } from "next/server";
import { TodoTable } from '@/lib/drizzle'
import { db } from '@/lib/drizzle'
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    const req = await request;
  console.log("request object is",req.nextUrl.pathname)
   
    const thePath=req.nextUrl.pathname
    const rid = thePath.substring(thePath.lastIndexOf('/') + 1)
     console.log("id is", rid)
    if(rid){
       

    const todo = await db.select().from(TodoTable).where(eq(TodoTable.id,rid))
   .where(eq(TodoTable.id,rid))  
   
    console.log('todo:', todo);

    return NextResponse.json( todo );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (params.id) {
      const req = await request;
      

      const { name, completed } = await req.json();
      console.log("name is", name,completed);

      
      const updatedTodo = await db
        .update(TodoTable)
        .set({ name, completed })
        .where(eq(TodoTable.id, params.id))
        .returning();

      console.log("updated todo", updatedTodo);
      return NextResponse.json({ todo: updatedTodo });
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: `Error updating todo with id ${params.id}`, todo: null });
  }
}

export async function DELETE(request: NextRequest) {
const req = await request;
    console.log("request object is", req.nextUrl.pathname);

    const thePath = req.nextUrl.pathname;
    const rid = thePath.substring(thePath.lastIndexOf('/') + 1);
    console.log("id is", typeof rid);
      try {
    

    if (rid) {
      const deletedTodo = await db.delete(TodoTable).returning().where(eq(TodoTable.id, rid));
      console.log(deletedTodo);
      return NextResponse.json({ todo: deletedTodo });
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: `Error deleting todo with id ${rid}`, todo: null });
  }
}

