export const neonInput =
    'w-full bg-[#0b0c10] border-b border-[#ffea00]/50 text-[#ffea00] font-mono text-sm px-2 py-1.5 ' +
    'focus:outline-none focus:border-[#ffea00] focus:bg-[#ffea00]/5 ' +
    'transition-colors placeholder-[#ffea00]/30 [color-scheme:dark]';

export const navStyles = {
    focusRing: "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0710]",
    focusRingAdmin: "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffea00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c10]",
    focusRingDanger: "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff00a0]",
    neonTextBlue: "text-[#00f0ff] hover:text-[#ff00a0] transition-colors rounded-sm",
    neonTextPink: "text-[#ff00a0] hover:text-[#00f0ff] transition-colors rounded-sm"
};

export const cartStyles = {
    pageContainer: "relative min-h-[calc(100vh-80px)] w-full bg-[#0b0c10] text-gray-200 font-sans selection:bg-[#ff00a0] selection:text-white pb-20 overflow-hidden print:bg-white print:text-black print:min-h-0 print:pb-0",
    headerText: "text-4xl sm:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff00a0] drop-shadow-[0_0_20px_rgba(255,0,160,0.5)] uppercase",
    itemCard: "group relative bg-[#0a0710]/90 backdrop-blur-xl border border-slate-700 hover:border-[#ff00a0]/60 rounded-sm p-5 sm:p-6 transition-all duration-300",
    deleteBtn: "flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-[#ff00a0] border border-[#ff00a0]/40 hover:border-[#ff00a0] hover:bg-[#ff00a0]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-sm text-xs font-mono uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff00a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0710] shadow-[0_0_10px_rgba(255,0,160,0.15)] hover:shadow-[0_0_20px_rgba(255,0,160,0.6)] w-full sm:w-auto group/btn",
    checkoutBtn: "group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#ff00a0] to-[#b026ff] text-white font-bold uppercase tracking-[0.125em] text-base transition-all hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#b026ff]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c10] shadow-[0_0_30px_rgba(176,38,255,0.5)] hover:shadow-[0_0_40px_rgba(176,38,255,0.7)] rounded-sm disabled:opacity-50 disabled:pointer-events-none"
};

export const pageContainerClass = `
    min-h-screen w-full flex flex-col bg-[#0b0c10] text-gray-200 
    font-sans selection:bg-[#ff00a0] selection:text-white 
    overflow-hidden relative items-center justify-center p-6
`;

export const neonGridFloorStyle = {
    backgroundImage: 'linear-gradient(to right, rgba(255,0,160,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,160,0.2) 1px, transparent 1px)',
    backgroundSize: '42px 42px',
    transform: 'perspective(520px) rotateX(62deg)',
    transformOrigin: 'bottom',
};

export const neonButtonClass = `
    inline-flex items-center justify-center gap-3 w-full sm:w-auto
    bg-gradient-to-r from-[#ff00a0] to-[#00f0ff] text-white font-bold 
    py-4 px-8 uppercase tracking-[0.2em] text-sm transition-all 
    hover:scale-[1.03] active:scale-95 focus:outline-none 
    focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-2 
    focus-visible:ring-offset-[#0b0c10] shadow-[0_0_20px_rgba(255,0,160,0.4)] 
    rounded-sm cursor-pointer
`;