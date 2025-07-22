import React from 'react';
import type { SVGComponentProps } from '../../types/SVG';

const Avatar: React.FC<SVGComponentProps> = ({ 
  className = '', 
  height = 32, 
  width = 32 
}) => (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g clip-path="url(#clip0_3438_33293)">
        <rect width="32" height="32" rx="16" fill="black" fill-opacity="0.1"/>
        <rect x="9" y="6" width="14" height="14" rx="7" fill="#106ADC"/>
        <rect x="-8" y="21" width="48" height="48" rx="24" fill="#106ADC"/>
        </g>
        <defs>
            <clipPath id="clip0_3438_33293">
            <rect width="32" height="32" rx="16" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

export default Avatar; 