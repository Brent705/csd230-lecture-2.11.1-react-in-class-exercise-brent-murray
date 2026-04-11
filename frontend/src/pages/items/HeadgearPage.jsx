import { useHeadgear } from '../../hooks/useHeadgear';
import Headgear from '../../components/items/Headgear';
import CategoryPage from './CategoryPage';
import { Shield } from 'lucide-react';

export function HeadgearPage() {
    const { getHeadgear } = useHeadgear();
    const { data: headgear } = getHeadgear;

    return (
        <CategoryPage isLoading={getHeadgear.isLoading} accentColor="#ff5500" loadingLabel="Loading Armor..." headerIcon={<Shield className="w-12 h-12 text-[#ff5500]" />} title="Headgear" subtitle={`${headgear?.length ?? 0} Hand Wraps Available`}>
            {getHeadgear.data?.map(h => <Headgear key={h.id} {...h} />)}
        </CategoryPage>
    );
}