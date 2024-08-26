import React, { useState } from 'react';
import { useDrag , DragPreviewImage } from 'react-dnd';
import { TiEdit, TiTick } from 'react-icons/ti';
import { MdDelete } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { Task as TaskType } from '../types';

interface TaskProps {
  task: TaskType;
  onComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (taskId: number, newTitle: string) => void;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, onComplete, onDelete, onEdit, index }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.title);

  // const [{ isDragging }, drag] = useDrag({
  //   item: { type: ItemTypes.TASK, id: task.id },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(task.id, editedTitle);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      
      <div className='task-number'>{index}:</div>
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleSaveEdit}
          autoFocus
        />
      ) : (
        <span>{task.title}</span>
      )}
      <div className="actions">
        {!isEditing && (
          <div className='container-action-icons'>
            <BsCheckCircleFill className="action-icon" onClick={() => onComplete(task.id)} />
            <TiEdit className="action-icon" onClick={handleEdit} />
            <MdDelete className="action-icon" onClick={() => onDelete(task.id)} />
          </div>
        )}
        {isEditing && (
          <>
            <TiTick className="action-icon" onClick={handleSaveEdit} />
            <MdDelete className="action-icon" onClick={handleCancelEdit} />
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
