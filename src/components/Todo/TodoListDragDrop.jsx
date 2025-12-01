import React from 'react';
import { Filter } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TodoItemDragDrop from './TodoItemDragDrop';

export default function TodoListDragDrop({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
  darkMode,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(todos, oldIndex, newIndex);
        onReorder(newOrder);
      }
    }
  };

  if (todos.length === 0) {
    return (
      <div className={`text-center py-12 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <Filter size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-lg">Aucune tâche à afficher</p>
        <p className="text-sm mt-2">Ajoutez votre première tâche pour commencer !</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItemDragDrop
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
              darkMode={darkMode}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}