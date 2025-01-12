"use client";
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './taskboard.css';

const initialTasks = {
  todo: {
    title: "Padaryti",
    items: [
      { id: '1', content: 'Uzduotis 1' },
      { id: '2', content: 'Uzduotis 2' }
    ]
  },
  inProgress: {
    title: "Daroma",
    items: [
      { id: '3', content: 'Uzduotis 3' }
    ]
  },
  done: {
    title: "Padaryta",
    items: [
      { id: '4', content: 'Uzduotis 4' }
    ]
  }
};

function Taskboard() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const sourceItems = [...tasks[source.droppableId].items];
      const [movedItem] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, movedItem);

      setTasks(prev => ({
        ...prev,
        [source.droppableId]: { ...prev[source.droppableId], items: sourceItems }
      }));
    } else {
      const sourceItems = [...tasks[source.droppableId].items];
      const destinationItems = [...tasks[destination.droppableId].items];
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      setTasks(prev => ({
        ...prev,
        [source.droppableId]: { ...prev[source.droppableId], items: sourceItems },
        [destination.droppableId]: { ...prev[destination.droppableId], items: destinationItems }
      }));
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board">
          {Object.entries(tasks).map(([key, { title, items }]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div className="task-column" {...provided.droppableProps} ref={provided.innerRef}>
                  <h3>{title}</h3>
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          className="task-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Taskboard;
