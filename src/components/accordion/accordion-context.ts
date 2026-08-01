import {createContext} from "react";

export type AccordionVariant = "default" | "glassy";

export type AccordionContextValue = {
    variant: AccordionVariant;
    isOpen: (itemId: string) => boolean;
    toggle: (itemId: string) => void;
};

export const AccordionContext = createContext<AccordionContextValue | null>(null);
