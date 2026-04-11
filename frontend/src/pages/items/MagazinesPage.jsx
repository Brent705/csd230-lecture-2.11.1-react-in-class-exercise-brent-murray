import { useMagazines } from '../hooks/useMagazines';
import Magazine from '../components/items/Magazine';
import CategoryPage from './CategoryPage';
import { Newspaper } from 'lucide-react';

export function MagazinesPage() {
    const { getMagazines } = useMagazines();
    const { data: magazines, isLoading } = getMagazines;

    return (
        <CategoryPage
            isLoading={isLoading}
            accentColor="#b026ff"
            loadingLabel="Loading Periodicals..."
            headerIcon={<Newspaper className="w-12 h-12 text-[#b026ff]" />}
            title="Magazines"
            subtitle={`${magazines?.length ?? 0} Magazines Available`}
        >
            {magazines?.map(m => <Magazine key={m.id} {...m} />)}
        </CategoryPage>
    );
}