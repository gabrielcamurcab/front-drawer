import { useState, useEffect } from 'react';
import { createSession } from '@/services/api';

const SESSION_KEY = 'drawer_session_id';
const SESSION_EXPIRY_KEY = 'drawer_session_expiry';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const useSession = () => {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeSession = async () => {
            try {
                const storedSession = localStorage.getItem(SESSION_KEY);
                const storedExpiry = localStorage.getItem(SESSION_EXPIRY_KEY);
                const now = new Date().getTime();

                if (storedSession && storedExpiry && now < parseInt(storedExpiry)) {
                    setSessionId(storedSession);
                } else {
                    const newSessionId = await createSession();
                    localStorage.setItem(SESSION_KEY, newSessionId);
                    localStorage.setItem(SESSION_EXPIRY_KEY, (now + SESSION_DURATION).toString());
                    setSessionId(newSessionId);
                }
            } catch (error) {
                console.error('Failed to initialize session:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeSession();
    }, []);

    return { sessionId, loading };
};
