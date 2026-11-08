import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { OrderModal } from "@/components/OrderModal";
import type { PlanId } from "@/data/content";

export type OrderSelection = {
  planId?: PlanId;
};

type OrderContextValue = {
  openOrder: (selection?: OrderSelection) => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<OrderSelection>({});

  const openOrder = useCallback((next?: OrderSelection) => {
    setSelection(next ?? {});
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openOrder }), [openOrder]);

  return (
    <OrderContext.Provider value={value}>
      {children}
      <OrderModal open={open} selection={selection} onClose={close} />
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within an OrderProvider");
  return ctx;
}
