import { SvgIcon, type SuusIconProps } from "./SvgIcon";

export function TrashIcon(props: SuusIconProps) {
    return (
        <SvgIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
        </SvgIcon>
    );
}
