import { Home, BookOpen, Newspaper, Disc, Plus, Shield, Activity } from 'lucide-react';
import { GiBoxingGlove, GiRunningShoe } from 'react-icons/gi';

export const NAV_LINKS = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Books', path: '/books', icon: BookOpen },
    { label: 'Magazines', path: '/magazines', icon: Newspaper },
    { label: 'Disc Mags', path: '/discmags', icon: Disc },
    { label: 'Gloves', path: '/gloves', icon: GiBoxingGlove },
    { label: 'Shoes', path: '/shoes', icon: GiRunningShoe },
    { label: 'Headgear', path: '/headgear', icon: Shield },
    { label: 'Hand Wraps', path: '/handwraps', icon: Activity },
];

export const ADMIN_LINKS = [
    { label: 'Add Book', path: '/add-book', icon: Plus },
    { label: 'Add Magazine', path: '/add-magazine', icon: Plus },
    { label: 'Add Disc Mag', path: '/add-discmag', icon: Plus },
    { label: 'Add Gloves', path: '/add-gloves', icon: Plus },
    { label: 'Add Shoes', path: '/add-shoes', icon: Plus },
    { label: 'Add Headgear', path: '/add-headgear', icon: Plus },
    { label: 'Add Hand Wraps', path: '/add-handwraps', icon: Plus },
];