import { Link } from 'react-router';
import { Command } from 'cmdk';
import { navStyles } from '../../utils/styles';

export const CmdkItem = ({ children, onSelect, icon: Icon, admin = false }) => (
    <Command.Item 
        onSelect={onSelect}
        className={`flex items-center gap-3 px-4 py-3 rounded-sm cursor-pointer transition-colors outline-none aria-selected:bg-[#00f0ff]/10 aria-selected:text-[#00f0ff] ${admin ? 'text-[#ffea00] aria-selected:text-[#ffea00] aria-selected:bg-[#ffea00]/10' : 'text-slate-300'}`}
    >
        <span className={`w-5 h-5 flex justify-center items-center ${admin ? 'text-[#ffea00]' : 'text-[#ff00a0]'}`}>
            <Icon />
        </span>
        <span className="uppercase text-xs tracking-wider">{children}</span>
    </Command.Item>
);

export const MenuLink = ({ to, icon: Icon, children, admin = false }) => (
    <Link
        to={to}
        className={`flex items-center gap-4 group font-mono text-sm uppercase tracking-wider transition-all rounded-sm px-2 py-2 ${admin ? navStyles.focusRingAdmin : navStyles.focusRing} ${
            admin ? "text-[#ffea00]/80 hover:text-[#ffea00]" : "text-white hover:text-[#00f0ff]"
        }`}
    >
        {Icon && (
            <span className="w-8 flex justify-center group-hover:scale-110 transition-transform">
                <Icon className={admin ? "w-4 h-4" : "w-5 h-5"} />
            </span>
        )}
        <span className={`border-b-2 border-transparent group-hover:border-current pb-0.5 ${admin ? '' : 'group-hover:drop-shadow-[0_0_8px_#00f0ff]'}`}>
            {children}
        </span>
    </Link>
);