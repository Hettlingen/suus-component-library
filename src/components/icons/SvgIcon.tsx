import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type SuusIconProps = Omit<ComponentPropsWithoutRef<"svg">, "children">;

type SvgIconProps = SuusIconProps & { children: ReactNode };

export function SvgIcon({ children, ...props }: SvgIconProps) {
    const hasAccessibleName = Boolean(props["aria-label"] || props["aria-labelledby"]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            focusable="false"
            role={hasAccessibleName ? "img" : undefined}
            aria-hidden={hasAccessibleName ? undefined : true}
            {...props}
        >
            {children}
        </svg>
    );
}
