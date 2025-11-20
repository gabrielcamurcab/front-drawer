'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from '@/hooks/useSession';
import { addName, getNames, drawName } from '@/services/api';
import { NameInput } from '@/components/NameInput';
import { NameList } from '@/components/NameList';
import { DrawSection } from '@/components/DrawSection';

export default function Home() {
    const { sessionId, loading } = useSession();
    const [names, setNames] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionId) {
            loadNames();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);

    const loadNames = async () => {
        if (!sessionId) return;
        try {
            const fetchedNames = await getNames(sessionId);
            setNames(fetchedNames);
        } catch (err) {
            console.error('Failed to load names:', err);
            setError('Erro ao carregar participantes.');
        }
    };

    const handleAddName = async (name: string) => {
        if (!sessionId) return;
        try {
            await addName(sessionId, name);
            await loadNames();
            setError(null);
        } catch (err) {
            console.error('Failed to add name:', err);
            setError('Erro ao adicionar participante.');
        }
    };

    const handleDraw = async (): Promise<string> => {
        if (!sessionId) throw new Error('No session');
        return await drawName(sessionId);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-4xl flex flex-col items-center">
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 text-center">
                    Sorteador Mágico
                </h1>
                <p className="text-gray-400 mb-12 text-center">
                    Adicione nomes e deixe a sorte decidir!
                </p>

                {error && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                    </div>
                )}

                <div className="w-full flex flex-col items-center gap-8">
                    <NameInput onAddName={handleAddName} disabled={!sessionId} />

                    <DrawSection
                        onDraw={handleDraw}
                        canDraw={names.length > 0}
                    />

                    <NameList names={names} />
                </div>
            </div>
        </main>
    );
}
