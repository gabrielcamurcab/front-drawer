import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface DrawSectionProps {
    onDraw: () => Promise<string>;
    canDraw: boolean;
}

export const DrawSection: React.FC<DrawSectionProps> = ({ onDraw, canDraw }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    const handleDraw = async () => {
        if (!canDraw || isDrawing) return;

        setIsDrawing(true);
        setWinner(null);

        // Simulate suspense
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const result = await onDraw();
            setWinner(result);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error('Error drawing:', error);
        } finally {
            setIsDrawing(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-8 w-full">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDraw}
                disabled={!canDraw || isDrawing}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform"
            >
                {isDrawing ? 'Sorteando...' : 'SORTEAR!'}
            </motion.button>

            <AnimatePresence>
                {winner && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-2xl text-gray-200 mb-2">O vencedor é:</p>
                        <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500 drop-shadow-lg">
                            {winner}
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
