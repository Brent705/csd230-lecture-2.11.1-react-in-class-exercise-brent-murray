export const formContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export const formItemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 26 } },
};

export const staggerContainer = {
    initial: { opacity: 0, filter: 'blur(10px)', y: 30 },
    animate: { 
        opacity: 1, 
        filter: 'blur(0px)', 
        y: 0, 
        transition: { duration: 1.2, ease: 'easeOut', staggerChildren: 0.2 } 
    }
};

export const childFadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } }
};

export const floatAnimation = {
    animate: { y: [0, -15, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};