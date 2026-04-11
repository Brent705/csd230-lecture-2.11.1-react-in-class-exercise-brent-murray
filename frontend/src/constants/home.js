import { BookOpen, Newspaper, Disc, Shield, Activity } from 'lucide-react';
import { GiBoxingGlove, GiRunningShoe } from 'react-icons/gi';

// --- ANIMATION VARIANTS ---
export const homeContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const homeItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// --- DATA CONFIGURATION ---
export const USER_CATEGORIES = [
    { name: "Books", path: "/books", icon: BookOpen, colorClass: "text-[#00f0ff]", hexColor: "#00f0ff" },
    { name: "Magazines", path: "/magazines", icon: Newspaper, colorClass: "text-[#00f0ff]", hexColor: "#00f0ff" },
    { name: "Disc Mags", path: "/discmags", icon: Disc, colorClass: "text-[#39ff14]", hexColor: "#39ff14" },
    { name: "Gloves", path: "/gloves", icon: GiBoxingGlove, colorClass: "text-[#ff00a0]", hexColor: "#ff00a0" },
    { name: "Shoes", path: "/shoes", icon: GiRunningShoe, colorClass: "text-[#b026ff]", hexColor: "#b026ff" },
    { name: "Headgear", path: "/headgear", icon: Shield, colorClass: "text-[#ff5500]", hexColor: "#ff5500" },
    { name: "Hand Wraps", path: "/handwraps", icon: Activity, colorClass: "text-[#00ffcc]", hexColor: "#00ffcc" }
];

export const ADMIN_ACTIONS = [
    { name: "Add Book", path: "/add-book", icon: BookOpen, colorClass: "text-[#ffea00]", hexColor: "#ffea00" },
    { name: "Add Magazine", path: "/add-magazine", icon: Newspaper, colorClass: "text-[#ffea00]", hexColor: "#ffea00" },
    { name: "Add Disc Mag", path: "/add-discmag", icon: Disc, colorClass: "text-[#39ff14]", hexColor: "#39ff14" },
    { name: "Add Gloves", path: "/add-gloves", icon: GiBoxingGlove, colorClass: "text-[#ff00a0]", hexColor: "#ff00a0" },
    { name: "Add Shoes", path: "/add-shoes", icon: GiRunningShoe, colorClass: "text-[#ff00a0]", hexColor: "#ff00a0" },
    { name: "Add Headgear", path: "/add-headgear", icon: Shield, colorClass: "text-[#ff5500]", hexColor: "#ff5500" },
    { name: "Add Hand Wraps", path: "/add-handwraps", icon: Activity, colorClass: "text-[#00ffcc]", hexColor: "#00ffcc" }
];