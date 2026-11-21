import { SvgIcon, type SuusIconProps } from "./SvgIcon";

export function UserPlaceholderIcon(props: SuusIconProps) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.87 0-7 2.24-7 5v1h14v-1c0-2.76-3.13-5-7-5Z" />
        </SvgIcon>
    );
}
