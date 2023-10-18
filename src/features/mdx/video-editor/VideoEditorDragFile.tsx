import { Card } from '@/components/ui/card';
import type { FC } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrop } from 'react-dnd';

export interface TargetBoxProps {
  onDrop: (item: { files: File[] }) => void;
}

export const TargetBox: FC<TargetBoxProps> = ({ onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: '.mp4',
      drop(item: { files: any[] }) {
        if (onDrop) {
          onDrop(item);
        }
      },
      canDrop(item: any) {
        console.log('canDrop', item.files, item.items);
        return true;
      },
      hover(item: any) {
        console.log('hover', item.files, item.items);
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any;
        if (item) {
          console.log('collect', item.files, item.items);
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [onDrop]
  );

  const isActive = canDrop && isOver;
  return (
    <Card className="p-4 border-dashed border-2 border-primary" ref={drop}>
      {isActive ? 'Release to drop' : 'Drag file here'}
    </Card>
  );
};
