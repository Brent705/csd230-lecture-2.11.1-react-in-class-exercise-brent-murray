import { useBooks } from '../../hooks/useBooks.js';
import Book from '../../components/items/Book.jsx';
import CategoryPage from './CategoryPage.jsx';
import { BookOpen } from 'lucide-react';

export function BooksPage() {
    const { getBooks } = useBooks();
    const { data: books, isLoading } = getBooks;

    return (
        <CategoryPage
            isLoading={isLoading}
            accentColor="#00f0ff"
            loadingLabel="Loading Database..."
            headerIcon={<BookOpen className="w-12 h-12 text-[#00f0ff]" />}
            title="Books"
            subtitle={`${books?.length ?? 0} Books Available`}
        >
            {books?.map(b => <Book key={b.id} {...b} />)}
        </CategoryPage>
    ); 
}