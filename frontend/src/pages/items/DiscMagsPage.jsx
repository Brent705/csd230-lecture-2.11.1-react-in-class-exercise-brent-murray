import { useDiscMags } from '../../hooks/useDiscMags';
import DiscMag from '../../components/items/DiscMag';
import CategoryPage from './CategoryPage';
import { Disc } from 'lucide-react';

export function DiscMagsPage() {
    const { getDiscMags } = useDiscMags();
    const { data: discMags, isLoading } = getDiscMags;

    return (
        <CategoryPage
            isLoading={isLoading}
            accentColor="#39ff14"
            loadingLabel="Loading Multimedia..."
            headerIcon={<Disc className="w-12 h-12 text-[#39ff14]" />}
            title="Disc Mags"
            subtitle={`${discMags?.length ?? 0} Multimedia Issues Available`}
        >
            {discMags?.map(d => <DiscMag key={d.id} {...d} />)}
        </CategoryPage>
    );
}