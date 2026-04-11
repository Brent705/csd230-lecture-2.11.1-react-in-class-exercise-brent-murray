import { Command } from 'cmdk';
import { Search, ShoppingCart } from 'lucide-react';
import { NAV_LINKS, ADMIN_LINKS } from '../../constants/navigation';
import { CmdkItem } from './NavbarItems';

export default function CommandPalette({ isOpen, setIsOpen, runCommand, isAdmin }) {
    return (
        <Command.Dialog 
            open={isOpen} 
            onOpenChange={setIsOpen}
            label="Global Command Menu"
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/70 backdrop-blur-sm p-4"
        >
            <div className="w-full max-w-2xl bg-[#0b0c10] border border-[#00f0ff]/50 rounded-md shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col font-mono [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-[#ff00a0] [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:uppercase [&_[cmdk-empty]]:p-6 [&_[cmdk-empty]]:text-center [&_[cmdk-empty]]:text-slate-400">
                <div className="flex items-center px-4 border-b border-[#00f0ff]/30">
                    <Search className="w-5 h-5 text-[#00f0ff] mr-3" aria-hidden="true" />
                    <Command.Input 
                        placeholder="Type a command or search..." 
                        className="w-full bg-transparent text-white placeholder-slate-500 h-14 focus:outline-none text-sm tracking-wide"
                    />
                    <kbd className="hidden sm:inline-block ml-2 font-sans text-[10px] px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-400">ESC</kbd>
                </div>
                
                <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[#ff00a0]/50 scrollbar-track-transparent">
                    <Command.Empty>No operations found in terminal.</Command.Empty>
                    
                    <Command.Group heading="Navigation">
                        {NAV_LINKS.map(link => (
                            <CmdkItem key={link.path} onSelect={() => runCommand(link.path)} icon={link.icon}>{link.label}</CmdkItem>
                        ))}
                        <CmdkItem onSelect={() => runCommand('/cart')} icon={ShoppingCart}>Cart</CmdkItem>
                    </Command.Group>

                    {isAdmin && (
                        <Command.Group heading="Admin Pages">
                            {ADMIN_LINKS.map(link => (
                                <CmdkItem key={link.path} onSelect={() => runCommand(link.path)} icon={link.icon} admin>{link.label}</CmdkItem>
                            ))}
                        </Command.Group>
                    )}
                </Command.List>
            </div>
        </Command.Dialog>
    );
}