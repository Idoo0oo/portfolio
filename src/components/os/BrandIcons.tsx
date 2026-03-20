import React from 'react';

interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const BrandIcons = {
  React: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="8" fill={color}/>
      <ellipse cx="50" cy="50" rx="45" ry="18" stroke={color} strokeWidth="3" fill="none"/>
      <ellipse cx="50" cy="50" rx="45" ry="18" stroke={color} strokeWidth="3" fill="none" transform="rotate(60 50 50)"/>
      <ellipse cx="50" cy="50" rx="45" ry="18" stroke={color} strokeWidth="3" fill="none" transform="rotate(120 50 50)"/>
    </svg>
  ),
  TypeScript: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 0h100v100H0z" fill={color}/>
      <path d="M35 80h10v-35h10V35H25v10h10v35zM75 80h10V35H55v10h10v10h10v10H65v10h10V80z" fill="white"/>
    </svg>
  ),
  Nodejs: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M50 5L15 25V65L50 85L85 65V25L50 5Z" stroke={color} strokeWidth="6" fill="none"/>
      <path d="M50 25L30 36V54L50 65L70 54V36L50 25Z" fill={color}/>
    </svg>
  ),
  Threejs: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M50 5L10 85H90L50 5Z" stroke={color} strokeWidth="5" fill="none"/>
      <path d="M50 25L30 65H70L50 25Z" fill={color}/>
    </svg>
  ),
  Tailwind: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M50 30C50 30 40 45 40 55C40 65 50 80 50 80C50 80 60 65 60 55C60 45 50 30 50 30Z" fill={color}/>
      <path d="M20 50C20 50 35 40 45 40C55 40 70 50 70 50C70 50 55 60 45 60C35 60 20 50 20 50Z" fill={color} opacity="0.6"/>
    </svg>
  ),
  Laravel: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 20H80V40H40V80H20V20Z" fill={color}/>
      <path d="M60 60H80V80H60V60Z" fill={color} opacity="0.8"/>
    </svg>
  ),
  PHP: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="50" cy="50" rx="45" ry="30" stroke={color} strokeWidth="5" fill="none"/>
      <path d="M35 40V70M35 40H45C50 40 50 50 45 50H35" stroke={color} strokeWidth="5"/>
    </svg>
  ),
  Python: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M50 10C35 10 30 15 30 25V35H50V40H20C10 40 10 60 20 60H30V70C30 80 35 85 50 85C65 85 70 80 70 70V60H50V55H80C90 55 90 35 80 35H70V25C70 15 65 10 50 10Z" fill={color}/>
    </svg>
  ),
  Javascript: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 0h100v100H0z" fill={color}/>
      <path d="M70 80h10V40H50v10h10v10h10V80z" fill="black"/>
    </svg>
  ),
  Vue: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M50 90L90 10H70L50 45L30 10H10L50 90Z" fill={color}/>
      <path d="M50 90L75 45L62.5 22.5L50 45L37.5 22.5L25 45L50 90Z" fill="black" opacity="0.2"/>
    </svg>
  ),
  PostgreSQL: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M80 40C80 20 60 10 40 10C20 10 10 30 10 50C10 70 30 90 50 90C70 90 90 70 90 50C90 45 85 40 80 40Z" fill={color}/>
    </svg>
  ),
  MySQL: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 80C20 80 10 60 30 40C50 20 80 20 80 20C80 20 90 40 70 60C50 80 20 80 20 80Z" fill={color}/>
    </svg>
  ),
  Express: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 20H90V30H20V50H80V60H20V80H10V20Z" fill={color}/>
    </svg>
  ),
  Bootstrap: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="80" height="80" x="10" y="10" rx="15" fill={color}/>
      <path d="M35 30H55C65 30 65 45 55 45H35V30ZM35 45H60C70 45 70 70 60 70H35V45Z" fill="white" stroke="white" strokeWidth="2"/>
    </svg>
  ),
  FramerMotion: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 10H90L50 50L10 10ZM10 10V90L50 50L10 10ZM90 90H10L50 50L90 90Z" fill={color}/>
    </svg>
  ),
  Figma: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="35" cy="25" r="15" fill={color}/>
      <circle cx="65" cy="25" r="15" fill={color} opacity="0.8"/>
      <circle cx="35" cy="50" r="15" fill={color} opacity="0.6"/>
      <circle cx="65" cy="50" r="15" fill={color} opacity="0.4"/>
      <path d="M20 75C20 75 20 90 35 90C50 90 50 75 50 75H20Z" fill={color} opacity="0.2"/>
    </svg>
  ),
  Git: ({ size = 16, color = "currentColor", ...props }: BrandIconProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M90 50L50 90L10 50L50 10L90 50Z" stroke={color} strokeWidth="6" fill="none"/>
      <circle cx="50" cy="30" r="8" fill={color}/>
      <circle cx="50" cy="70" r="8" fill={color}/>
      <circle cx="70" cy="50" r="8" fill={color}/>
      <path d="M50 38V62M50 50H62" stroke={color} strokeWidth="4"/>
    </svg>
  ),
};
