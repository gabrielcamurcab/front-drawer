import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface NameInputProps {
    onAddName: (name: string) => Promise<void>;
    disabled?: boolean;
}

export const NameInput: React.FC<NameInputProps> = ({ onAddName, disabled }) => {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onAddName(name.trim());
            setName('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite um nome..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                disabled={disabled || isSubmitting}
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={disabled || isSubmitting || !name.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isSubmitting ? '...' : 'Adicionar'}
            </motion.button>
        </form>
    );
};
