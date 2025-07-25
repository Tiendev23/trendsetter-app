import { useState, useEffect } from "react";

type Props = {
    startDate: string;
    endDate: string;
};

export function useCampaignTimer({ startDate, endDate }: Props) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const isUpcoming = new Date(startDate).getTime() > now;

    const end = new Date(endDate).getTime();
    const diff = Math.max(end - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { isUpcoming, diff, days, hours, minutes, seconds };
}
