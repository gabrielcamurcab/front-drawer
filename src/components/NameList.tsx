import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NameListProps {
    names: string[];
}

export const NameList: React.FC<NameListProps> = ({ names = [] }) => {
    const safeNames = Array.isArray(names) ? names : [];

    return (
        <div className="w-full max-w-md mt-8">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Participantes ({safeNames.length})
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
                <AnimatePresence>
                    {safeNames.map((name, index) => (
                        <motion.div
                            key={`${name}-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium shadow-sm border border-white/10"
                        >
                            {name}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {safeNames.length === 0 && (
                    <p className="text-gray-300 italic">Nenhum participante ainda.</p>
                )}
            </div>
        </div>
    );
};
