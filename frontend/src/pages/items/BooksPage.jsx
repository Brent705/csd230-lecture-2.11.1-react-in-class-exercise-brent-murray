import { useBooks } from '../hooks/useBooks';
import Book from '../components/items/Book';
import CategoryPage from './CategoryPage';
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