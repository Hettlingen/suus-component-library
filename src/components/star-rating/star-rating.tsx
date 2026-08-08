// components/StarRating.tsx
import {useState} from "react";
import type {ColorToken as ButtonColorToken} from "../form/button/Button";

export type StarRatingColorToken = ButtonColorToken | "--color-gold-default";

export type StarRatingProps = {
    value: number;
    onChange?: (value: number) => void;
    max?: number;
    readOnly?: boolean;
    colorToken?: StarRatingColorToken;
    reviewCount?: number;
};

/**
 * StarRating component allows users to rate something using stars.
 * <StarRating value={rating} onChange={handleStarRatingChange} />
 * <StarRating value={4} readOnly />
 *
 *     const [rating, setRating] = useState<number>(3);
 *     const handleStarRatingChange = (newRating: number) => {
 *         setRating(newRating);
 *         console.log('Neue Bewertung:', newRating);
 *     };
 *
 * @param value
 * @param onChange
 * @param max
 * @param readOnly
 * @param reviewCount
 * @constructor
 */
export function StarRating({
    value,
    onChange,
    max = 5,
    readOnly = false,
    colorToken = "--color-gold-default",
    reviewCount = 23,
}: StarRatingProps) {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        if (!readOnly && onChange) {
            onChange(index + 1);
        }
    };

    const handleMouseEnter = (index: number) => {
        if (!readOnly) {
            setHoveredIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoveredIndex(null);
        }
    };

    return (
        <div style={{display: "flex", gap: "0.25rem"}}>
            {Array.from({ length: max }).map((_, i) => {
                const isFilled = hoveredIndex !== null ? i <= hoveredIndex : i < value;
                const filledColor = `var(${colorToken})`;

                return (
                    <span
                       key={i}
                       onClick={() => handleClick(i)}
                       onMouseEnter={() => handleMouseEnter(i)}
                       onMouseLeave={handleMouseLeave}
                       style={{
                           fontSize: "2rem",
                           color: isFilled ? filledColor : "#CCCCCC",
                           cursor: readOnly ? "default" : "pointer",
                           transition: "color 0.2s",
                       }}
                    >
                       ★
                    </span>
                );
            })}
            <p style={{color: `var(${colorToken})`}}>{reviewCount} Reviews</p>
        </div>
    );
};
