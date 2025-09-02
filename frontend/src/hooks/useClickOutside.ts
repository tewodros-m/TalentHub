import { useEffect } from 'react';

export function useClickOutside(
  refs: Array<React.RefObject<HTMLElement | null>>,
  onClickOutside: () => void,
  isActive: boolean
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedInside = refs.some(
        (ref) => ref.current && ref.current.contains(event.target as Node)
      );
      if (!clickedInside) {
        onClickOutside();
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, onClickOutside, isActive]);
}
