import styles from "./avatar.module.css";

import React, { useEffect, useState } from 'react';

export interface AvatarProps {
    // Pflicht: Bild-URL des Avatars — oder alternativ children (SVG-Icon-Komponente)
    src?: string;
    // Optionales Alt-Text für Accessibility
    alt?: string;
    // Größe des Avatars in Pixel
    size?: number;
    // Form: circle oder square
    shape?: 'circle' | 'square';
    // Zusätzliche CSS-Klasse
    className?: string;
    // Optionaler Click-Handler
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    // Optionales Bild-Fallback-Bild-URL, falls das Hauptbild nicht geladen wird
    fallbackSrc?: string;
    // SVG-Icon-Komponente als Alternative zu src — erlaubt CSS fill-Hover-Styles
    children?: React.ReactNode;
}

export function Avatar({
                                 src,
                                 alt = 'Avatar',
                                 size = 40,
                                 shape = 'circle',
                                 className,
                                 onClick,
                                 fallbackSrc,
                                 children,
                             } : AvatarProps ) {

    const [imgSrc, setImgSrc] = useState<string>(src ?? '');

    useEffect(() => {
        setImgSrc(src ?? '');
    }, [src]);

    const handleError = () => {
        if (fallbackSrc) {
            setImgSrc(fallbackSrc);
        } else {
            setImgSrc('');
        }
    };

    const wrapperStyle: React.CSSProperties = {
        ['--avatar-size' as any]: `${size}px`,
        ['--avatar-radius' as any]: shape === 'circle' ? '50%' : '0'
    };

    return (
        <div
            className={[styles.avatar, className].filter(Boolean).join(' ')}
            style={wrapperStyle}
            onClick={onClick}
            aria-label={alt}
            role="img"
        >
            {children ?? (imgSrc ? (
                <img src={imgSrc} alt={alt} onError={handleError} />
            ) : (
                <span aria-hidden="true" />
            ))}
        </div>
    );
}
