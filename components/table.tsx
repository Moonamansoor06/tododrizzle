import { db, BooksTable } from '@/lib/drizzle';
import { timeAgo } from '@/lib/utils';
import Image from 'next/image';
import RefreshButton from './refresh-button';
import { seed } from '@/lib/seed';

export default async function Table() {
  let books;
  let startTime = Date.now();
  try {
    books = await db.select().from(BooksTable);
  } catch (e: any) {
    if (e.message === `relation "books" does not exist`) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...'
      );
      // Table is not created yet
      await seed();
      startTime = Date.now();
      books = await db.select().from(BooksTable);
    } else {
      throw e;
    }
  }

  const duration = Date.now() - startTime;

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Books</h2>
          <p className="text-sm text-gray-500">
            Fetched {books.length} books in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
            
              <div className="space-y-1">
                <p className="font-medium leading-none">{book.bookname}</p>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-sm text-gray-500">{book.booktype}</p>
                <p className="text-sm text-gray-500">{book.qty}</p>
                <p className="text-sm text-gray-500">{book.price}</p>
              </div>
            </div>
       
          </div>
        ))}
      </div>
    </div>
  );
}
