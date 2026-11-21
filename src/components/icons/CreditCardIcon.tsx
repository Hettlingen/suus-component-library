import { useId } from "react";
import { SvgIcon, type SuusIconProps } from "./SvgIcon";

export function CreditCardIcon(props: SuusIconProps) {
    const clipId = useId();

    return (
        <SvgIcon viewBox="0 0 40 40" {...props}>
            <defs>
                <clipPath id={clipId}>
                    <rect width="40" height="40" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${clipId})`}>
                <path d="M36.6668 9.44438V30.5555C36.6668 31.3055 36.3914 31.956 35.8405 32.5069C35.2895 33.0578 34.6391 33.3333 33.8891 33.3333H6.11125C5.36125 33.3333 4.71079 33.0578 4.15987 32.5069C3.60895 31.956 3.3335 31.3055 3.3335 30.5555V9.44438C3.3335 8.69438 3.60895 8.04392 4.15987 7.493C4.71079 6.94208 5.36125 6.66663 6.11125 6.66663H33.8891C34.6391 6.66663 35.2895 6.94208 35.8405 7.493C36.3914 8.04392 36.6668 8.69438 36.6668 9.44438ZM6.11125 13.5833H33.8891V9.44438H6.11125V13.5833ZM6.11125 19.3888V30.5555H33.8891V19.3888H6.11125Z" />
            </g>
        </SvgIcon>
    );
}
