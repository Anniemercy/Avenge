import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children, title }) => {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-lg max-h-[90vh] overflow-auto bg-charcoal rounded-2xl border border-gold/20 shadow-elevated"
                        >
                            {/* Header */}
                            {title && (
                                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gold/10 bg-charcoal">
                                    <h3 className="font-display text-xl font-semibold text-off-white">
                                        {title}
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gold transition-colors rounded-lg hover:bg-gold/10"
                                        aria-label="Close modal"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {children}
                            </div>

                            {/* Close button if no title */}
                            {!title && (
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gold transition-colors rounded-lg hover:bg-gold/10"
                                    aria-label="Close modal"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
