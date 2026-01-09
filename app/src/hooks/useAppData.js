import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import { GOALS, calculateLevel } from '../utils/gameLogic';

export function useAppData() {
    const [data, setData] = useState({
        xp: 0,
        money: { pe: 0, ch: 0 },
        history: [],
        level: null,
        loading: true
    });

    useEffect(() => {
        const historyRef = ref(db, 'historico');

        // Subscribe to real-time changes
        const unsubscribe = onValue(historyRef, (snapshot) => {
            const val = snapshot.val();
            const list = [];
            let totalXP = 0;
            let totalPE = 0;
            let totalCH = 0;

            if (val) {
                Object.keys(val).forEach((key) => {
                    const item = { id: key, ...val[key] };
                    list.push(item);

                    // Calculate totals locally
                    totalXP += Number(item.xp || 0);
                    if (item.tipo === 'pe') totalPE += Number(item.val || 0);
                    if (item.tipo === 'ch') totalCH += Number(item.val || 0);
                });
            }

            setData({
                xp: totalXP,
                money: { pe: totalPE, ch: totalCH },
                history: list.reverse(), // Newest first
                level: calculateLevel(totalXP),
                loading: false
            });
        });

        return () => unsubscribe();
    }, []);

    return data;
}
