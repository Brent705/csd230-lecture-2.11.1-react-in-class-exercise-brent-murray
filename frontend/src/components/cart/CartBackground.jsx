export default function CartBackground() {
    return (
        <>
            <div 
                aria-hidden="true"
                className="fixed bottom-0 left-0 right-0 h-[65%] pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,0,160,0.06) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,0,160,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    transform: 'perspective(600px) rotateX(65deg)',
                    transformOrigin: 'bottom',
                    maskImage: 'linear-gradient(to top, black 30%, transparent 85%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 85%)'
                }}
            />
            <div aria-hidden="true" className="fixed inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-[#0b0c10]/75 to-[#ff00a0]/5 pointer-events-none z-0" />
            <div 
                aria-hidden="true"
                className="fixed inset-0 pointer-events-none z-0 bg-[repeating-linear-gradient(transparent_0px,#ff00a00a_2px,transparent_4px)] animate-[scan_8s_linear_infinite]"
                style={{ animation: 'scan 8s linear infinite' }}
            />
        </>
    );
}