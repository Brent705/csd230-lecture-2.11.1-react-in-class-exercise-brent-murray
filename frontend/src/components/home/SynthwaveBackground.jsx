export default function SynthwaveBackground({ gridColorRgba, vignetteGradient, scanlineColorRgba }) {
    return (
        <>
            {/* Grid Floor Effect */}
            <div 
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[65%] pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, ${gridColorRgba} 1px, transparent 1px), linear-gradient(to bottom, ${gridColorRgba} 1px, transparent 1px)`,
                    backgroundSize: '52px 52px',
                    transform: 'perspective(600px) rotateX(62deg)',
                    transformOrigin: 'bottom',
                    maskImage: 'linear-gradient(to top, black 30%, transparent 90%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 90%)'
                }}
            />

            {/* Radial Vignette */}
            <div 
                aria-hidden="true" 
                className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${vignetteGradient} pointer-events-none z-0`} 
            />

            {/* Static Scanline Overlay */}
            <div 
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-30 opacity-10 mix-blend-overlay"
                style={{
                    background: `repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, ${scanlineColorRgba} 3px, ${scanlineColorRgba} 6px)`
                }}
            />
        </>
    );
}