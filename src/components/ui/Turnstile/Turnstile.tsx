import Turnstile from 'react-turnstile';
import { useState, useEffect } from 'react';

export function TurnstileComponent({ onTokenObtained }: { onTokenObtained: (token: string) => void }) {
    const [_, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSuccess = (token: string) => {
        onTokenObtained(token);
    };

    return (
        <Turnstile
            sitekey="0x4AAAAAABaHHa6X3FMHupTk"
            onSuccess={handleSuccess}
            onLoad={() => setLoading(false)}
        />
    );
}
