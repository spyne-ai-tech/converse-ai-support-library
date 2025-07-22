import React from 'react';
import type { SVGComponentProps } from '../../types/components';

const Send: React.FC<SVGComponentProps> = ({ 
  className = '', 
  height = 18, 
  width = 16 
}) => (
    <svg width={width} height={height} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M1.68906 15.4242C1.35573 15.5576 1.03906 15.5284 0.739063 15.3367C0.439063 15.1451 0.289062 14.8659 0.289062 14.4992V9.99924L8.28906 7.99924L0.289062 5.99924V1.49924C0.289062 1.13257 0.439063 0.853405 0.739063 0.661739C1.03906 0.470072 1.35573 0.440905 1.68906 0.574239L17.0891 7.07424C17.5057 7.25757 17.7141 7.56591 17.7141 7.99924C17.7141 8.43257 17.5057 8.74091 17.0891 8.92424L1.68906 15.4242Z" fill="#2368E1"/>
    </svg>
);

export default Send; 