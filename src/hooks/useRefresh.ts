import { useAppDispatch } from "@/redux/hooks";
import { useState, useCallback } from "react";

export const useRefresh = (action: any) => {
    const dispatch = useAppDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        if(!action) return;
        setRefreshing(true);
        await dispatch(action());
        setRefreshing(false);
    }, [dispatch, action]);

    return { refreshing, onRefresh };
};
