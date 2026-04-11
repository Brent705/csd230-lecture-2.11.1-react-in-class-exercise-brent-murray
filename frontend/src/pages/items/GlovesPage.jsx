import { useGloves } from '../../hooks/useGloves.js';
import Gloves from '../../components/items/Gloves.jsx';
import CategoryPage from './CategoryPage.jsx';
import { GiBoxingGlove } from 'react-icons/gi';

export function GlovesPage() {
    const { getGloves } = useGloves();
    const { data: gloves, isLoading } = getGloves;

    return (
        <CategoryPage
            isLoading={isLoading}
            accentColor="#ff00a0"
            loadingLabel="Loading Combat Gear..."
            headerIcon={<GiBoxingGlove className="w-14 h-14 text-[#ff00a0]" />}
            title="Boxing Gloves"
            subtitle={`${gloves?.length ?? 0} Gloves Available`}
        >
            {gloves?.map(g => <Gloves key={g.id} {...g} />)}
        </CategoryPage>
    );
}