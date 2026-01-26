import { useEffect } from 'react';

export type HotkeyMap = Record<string, (e: KeyboardEvent) => void>;

export function useHotkeys(map: HotkeyMap): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const prefix = [
        e.ctrlKey ? 'Ctrl' : '',
        e.shiftKey ? 'Shift' : '',
        e.altKey ? 'Alt' : '',
      ].filter(Boolean);
      const key = [...prefix, e.key].join('+');
      const fn = map[key];
      if (fn) fn(e);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [map]);
}
