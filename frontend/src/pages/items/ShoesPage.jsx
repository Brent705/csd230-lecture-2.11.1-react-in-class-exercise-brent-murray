import { useShoes } from '../hooks/useShoes';
import Shoes from '../components/items/Shoes';
import CategoryPage from './CategoryPage';
import { GiRunningShoe } from 'react-icons/gi';

export function ShoesPage() {
    const { getShoes } = useShoes();
    const { data: shoes, isLoading } = getShoes;

    return (
        <CategoryPage
            isLoading={isLoading}
            accentColor="#b026ff"
            loadingLabel="Loading Footwear..."
            headerIcon={<GiRunningShoe className="w-14 h-14 text-[#b026ff]" />}
            title="Boxing Shoes"
            subtitle={`${shoes?.length ?? 0} Pairs Available`}
        >
            {shoes?.map(s => <Shoes key={s.id} {...s} />)}
        </CategoryPage>
    );
}