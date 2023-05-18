import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import { CustomerTable } from '@/lib/drizzle'
import { db } from '@/lib/drizzle'
import { eq } from 'drizzle-orm';



export async function GET(request: NextRequest) {
    const req = await request;
  console.log("request object is",req.nextUrl.pathname)
   
    const thePath=req.nextUrl.pathname
    const idstr = thePath.substring(thePath.lastIndexOf('/') + 1)
    const rid =parseInt(idstr,10)
     console.log("id is",typeof rid)
    if(rid){
       

    const customer = await db.select().from(CustomerTable)
   .where(eq(CustomerTable.id,rid))  
   
    console.log('customer:', customer);

    return NextResponse.json( customer );
  }
}




export async function PUT(request: NextRequest,apiRequest:NextApiRequest ) {
    const req = await request;
    console.log("request object is",req.nextUrl.pathname)
     
      const thePath=req.nextUrl.pathname
      const idstr = thePath.substring(thePath.lastIndexOf('/') + 1)
      const rid =parseInt(idstr,10)
       console.log("id is",typeof rid)
      if(rid){
    if(apiRequest.body){
    const {customername,customeremail } = apiRequest.body

    if (!customername && customeremail) {
      NextResponse.json({ error: 'At least one field is required to update' })
      return
    }
    const updatedcustomer = await db.update(CustomerTable)
      .set({ customername,customeremail })
      .returning()

    if (updatedcustomer.length > 0) {
      NextResponse.json({ customer: updatedcustomer[0] })
    } else {
      NextResponse.json({ error: `Customer with id ${rid} not found` })
    }
}
}
}
export async function DELETE(request: NextRequest, ) {
    const req = await request;
    console.log("request object is",req.nextUrl.pathname)
     
      const thePath=req.nextUrl.pathname
      const idstr = thePath.substring(thePath.lastIndexOf('/') + 1)
      const rid =parseInt(idstr,10)
       console.log("id is",typeof rid)
      if(rid){
    const deletedcustomer = await db.delete(CustomerTable).where(eq(CustomerTable.id,rid))
    .returning()

    if (deletedcustomer.length > 0) {
     NextResponse.json({ book: deletedcustomer[0] });
      } else {
       NextResponse.json({ error: 'customer not found' });
      }}
  }