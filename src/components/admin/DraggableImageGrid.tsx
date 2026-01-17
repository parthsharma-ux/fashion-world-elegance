import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, GripVertical } from 'lucide-react';

interface DraggableImageGridProps {
  images: string[];
  onReorder: (images: string[]) => void;
  onRemove: (index: number) => void;
}

const DraggableImageGrid: React.FC<DraggableImageGridProps> = ({
  images,
  onReorder,
  onRemove,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newImages = [...images];
    const [draggedItem] = newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedItem);
    
    onReorder(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {images.map((img, index) => (
        <motion.div
          key={`${img}-${index}`}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: draggedIndex === index ? 0.5 : 1, 
            scale: 1,
            y: dragOverIndex === index ? -4 : 0,
          }}
          className={`relative group cursor-grab active:cursor-grabbing ${
            dragOverIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''
          }`}
          draggable
          onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, index)}
          onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e as unknown as React.DragEvent, index)}
          onDragEnd={handleDragEnd}
        >
          <div className="relative">
            <img
              src={img}
              alt={`Product ${index + 1}`}
              className="w-full aspect-[3/4] object-cover rounded-lg border"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Error';
              }}
            />
            
            {/* Drag handle indicator */}
            <div className="absolute top-1 left-1 w-6 h-6 bg-background/80 backdrop-blur-sm rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            
            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
            >
              <X className="w-3 h-3" />
            </button>
            
            {/* Main image badge */}
            {index === 0 && (
              <span className="absolute bottom-1 left-1 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                Main
              </span>
            )}
            
            {/* Position indicator */}
            <span className="absolute bottom-1 right-1 text-[10px] bg-background/80 text-foreground px-1.5 py-0.5 rounded">
              {index + 1}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DraggableImageGrid;
