// components/StarRating.tsx
import {useState} from 'react';

type StarRatingProps = {
    value: number;
    onChange?: (value: number) => void;
    max?: number;
    readOnly?: boolean;
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
 * @constructor
 */
export function StarRating({
                        value,
                        onChange,
                        max = 5,
                        readOnly = false,
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
        <div style={{ display: 'flex', gap: '0.25rem' }}>
            {Array.from({ length: max }).map((_, i) => {
                const isFilled = hoveredIndex !== null ? i <= hoveredIndex : i < value;

                return (
                    <span
                        key={i}
                        onClick={() => handleClick(i)}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            fontSize: '2rem',
                            color: isFilled ? '#FFD700' : '#CCCCCC',
                            cursor: readOnly ? 'default' : 'pointer',
                            transition: 'color 0.2s',
                        }}
                    >
                        ★
                     </span>
                );
            })}
            <p>23 Reviews</p>
        </div>
    );
};
