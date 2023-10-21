import { LessonPlaceholder } from './LessonPlaceholder';
import { LessonNavigationMenuPlaceholder } from './placehlder/LessonNavigationMenuPlaceholder';

export default function loading() {
  return (
    <div
      className="flex p-2 lg:p-4 gap-4 h-full relative"
      style={{
        height: `calc(100vh - var(--header-height) - 1px)`,
      }}
    >
      <LessonNavigationMenuPlaceholder />
      <LessonPlaceholder />
    </div>
  );
}
