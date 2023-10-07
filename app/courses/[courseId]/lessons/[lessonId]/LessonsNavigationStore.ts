import { create } from 'zustand';
import { useMediaQuery } from 'usehooks-ts';

type LessonNavigationState = 'OPEN' | 'CLOSED' | 'STICKY';

type LessonNavigationStore = {
  state: LessonNavigationState;
  setState: (state: LessonNavigationState) => void;
};

export const useLessonNavigation = create<LessonNavigationStore>((set) => ({
  state: 'STICKY',
  setState: (state: LessonNavigationState) => set({ state }),
}));

export const useLessonNavigationState = () => {
  const state = useLessonNavigation((state) => state.state);

  // medium tailwind media query = 768px
  const isMedium = useMediaQuery('(min-width: 768px)');

  if (!isMedium && state === 'STICKY') {
    return 'CLOSED';
  }

  return state;
};
