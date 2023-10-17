import { useMediaQuery } from 'usehooks-ts';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LessonNavigationState = 'OPEN' | 'CLOSED' | 'STICKY';

type LessonNavigationStore = {
  state: LessonNavigationState;
  setState: (state: LessonNavigationState) => void;
};

export const useLessonNavigation = create(
  persist<LessonNavigationStore>(
    (set) => ({
      state: 'STICKY',
      setState: (state: LessonNavigationState) => set({ state }),
    }),
    {
      name: 'prose-settings',
    }
  )
);

export const useLessonNavigationState = () => {
  const state = useLessonNavigation((state) => state.state);

  // medium tailwind media query = 768px
  const isMedium = useMediaQuery('(min-width: 768px)');

  if (!isMedium && state === 'STICKY') {
    return 'CLOSED';
  }

  return state;
};
