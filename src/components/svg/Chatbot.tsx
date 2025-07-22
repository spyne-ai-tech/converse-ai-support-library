import React from 'react';
import type { SVGComponentProps } from '../../types/components';

const Chatbot: React.FC<SVGComponentProps> = ({ 
  className = '', 
  height = 32, 
  width = 32,
}) => (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="32" height="32" rx="16" fill="#F1EAFF"/>
        <rect width="32" height="32" rx="16" fill="url(#paint0_linear_3438_33268)"/>
        <path d="M16 8L15.4103 9.59314C14.6377 11.6823 14.2514 12.7269 13.4891 13.4891C12.7269 14.2514 11.6823 14.6377 9.59314 15.4103L8 16L9.59314 16.5897C11.6823 17.3623 12.7269 17.7497 13.4891 18.5109C14.2514 19.272 14.6377 20.3177 15.4103 22.4069L16 24L16.5897 22.4069C17.3623 20.3177 17.7497 19.2731 18.5109 18.5109C19.272 17.7486 20.3177 17.3623 22.4069 16.5897L24 16L22.4069 15.4103C20.3177 14.6377 19.2731 14.2514 18.5109 13.4891C17.7486 12.7269 17.3623 11.6823 16.5897 9.59314L16 8Z" fill="white"/>
        <defs>
        <linearGradient id="paint0_linear_3438_33268" x1="4.06557" y1="1.44262" x2="28.5902" y2="29.7705" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5BBFF6"/>
            <stop offset="0.28" stop-color="#7F6AF2"/>
            <stop offset="0.49" stop-color="#B651D7"/>
            <stop offset="0.67" stop-color="#E83E54"/>
            <stop offset="1" stop-color="#ED8939"/>
        </linearGradient>
        </defs>
    </svg>
);

export default Chatbot; 