import { useHandWraps } from '../../hooks/useHandWraps';
import HandWraps from '../../components/items/HandWraps';
import CategoryPage from './CategoryPage';
import { Activity } from 'lucide-react';

export function HandWrapsPage() {
    const { getHandWraps } = useHandWraps();
    const { data: handWraps } = getHandWraps;

    return (
        <CategoryPage isLoading={getHandWraps.isLoading} accentColor="#ff5500" loadingLabel="Loading hand wraps..." headerIcon={<Activity className="w-12 h-12 text-[#ff5500]" />} title="HandWraps" subtitle={`${handWraps?.length ?? 0} Hand Wraps Available`}>
            {getHandWraps.data?.map(h => <HandWraps key={h.id} {...h} />)}
        </CategoryPage>
    );
}