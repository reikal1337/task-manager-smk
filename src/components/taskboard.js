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
  const [newTaskContent, setNewTaskContent] = useState("");

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceItems = Array.from(tasks[source.droppableId].items);
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setTasks(prev => ({
        ...prev,
        [source.droppableId]: { ...prev[source.droppableId], items: sourceItems }
      }));
    } else {
      const destinationItems = Array.from(tasks[destination.droppableId].items);
      destinationItems.splice(destination.index, 0, movedItem);
      setTasks(prev => ({
        ...prev,
        [source.droppableId]: { ...prev[source.droppableId], items: sourceItems },
        [destination.droppableId]: { ...prev[destination.droppableId], items: destinationItems }
      }));
    }
  };

  const addTask = () => {
    if (!newTaskContent.trim()) return;

    const newTask = { id: `${Date.now()}`, content: newTaskContent };
    const updatedTasks = { ...tasks };
    updatedTasks.todo.items.push(newTask);
    setTasks(updatedTasks);
    setNewTaskContent("");
  };

  const removeTask = (taskId, columnId) => {
    const updatedTasks = { ...tasks };
    updatedTasks[columnId].items = updatedTasks[columnId].items.filter(item => item.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board">
          {Object.entries(tasks).map(([key, { title, items }]) => (
            <Droppable droppableId={key} key={key} isCombineEnabled={false}>
              {(provided) => (
                <div
                  className="task-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="task-column-header">
                    <h3>{title}</h3>
                    {key === 'todo' && (
                      <div className="task-input-container">
                        <input
                          type="text"
                          className="task-input"
                          value={newTaskContent}
                          onChange={(e) => setNewTaskContent(e.target.value)}
                          placeholder="Įveskite pavadinimą"
                        />
                        <button className="add-task-button" onClick={addTask}>Pridėti</button>
                      </div>
                    )}
                  </div>
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
                          <button
                            className="remove-task-button"
                            onClick={() => removeTask(item.id, key)}
                          >
                            Panaikinti
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
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
