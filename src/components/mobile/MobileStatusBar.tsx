import { useState, useEffect } from 'react';
import { useOSStore } from '../../core/store/useOSStore';
import { cn } from '../../core/lib/utils';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function MobileStatusBar() {
  const { isDarkMode } = useOSStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000); // update every 30s

    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  const textColor = cn(
    'transition-colors duration-500',
    isDarkMode ? 'text-white' : 'text-zinc-900'
  );

  return (
    <div
      className={cn(
        'absolute top-0 left-0 right-0 z-[90] flex items-center justify-between px-7 h-[50px] pointer-events-none',
        'transition-colors duration-500'
      )}
    >
      {/* Left: Time */}
      <span className={cn('text-[15px] font-semibold tabular-nums', textColor)}>
        {timeStr}
      </span>

      {/* Center: Dynamic Island Pill */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[8px]">
        <div
          className={cn(
            'w-[120px] h-[32px] rounded-full transition-colors duration-500',
            isDarkMode ? 'bg-black' : 'bg-black'
          )}
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-1.5">
        <Signal
          size={14}
          strokeWidth={2.5}
          className={textColor}
        />
        <Wifi
          size={15}
          strokeWidth={2.5}
          className={textColor}
        />
        {/* Battery with fill level */}
        <div className="relative flex items-center">
          <Battery
            size={22}
            strokeWidth={2}
            className={textColor}
          />
          {/* Battery fill overlay */}
          <div
            className={cn(
              'absolute left-[4px] top-1/2 -translate-y-1/2 h-[8px] rounded-sm',
              isDarkMode ? 'bg-white' : 'bg-zinc-900'
            )}
            style={{ width: '11px' }} // ~85% fill
          />
        </div>
      </div>
    </div>
  );
}
