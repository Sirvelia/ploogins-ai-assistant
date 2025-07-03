import React from 'react';
import { Icon } from '@wordpress/components';
import { starFilled, starHalf, starEmpty } from '@wordpress/icons';

interface RatingStarsProps {
    rating: number;
}

const RatingStars = ({ rating }: RatingStarsProps) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '0' }}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Icon 
                    style={{ fill: '#dba617', flex: '0 0 24px' }} 
                    icon={index < rating ? starFilled : (rating > 0 && index < rating + 0.5) ? starHalf : starEmpty} 
                />
            ))}
        </div>
    );
};

export default RatingStars;