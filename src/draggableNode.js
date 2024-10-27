// draggableNode.js
import React from 'react';

const nodeConfig = {
  customInput: {
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    icon: '📥'
  },
  llm: {
    color: 'bg-purple-600',
    hoverColor: 'hover:bg-purple-700',
    icon: '🤖'
  },
  customOutput: {
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-700',
    icon: '📤'
  },
  text: {
    color: 'bg-gray-600',
    hoverColor: 'hover:bg-gray-700',
    icon: '📝'
  },
  api: {
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
    icon: '🌐'
  },
  transform: {
    color: 'bg-yellow-600',
    hoverColor: 'hover:bg-yellow-700',
    icon: '🔄'
  },
  timer: {
    color: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-700',
    icon: '⏲️'
  },
  filter: {
    color: 'bg-pink-600',
    hoverColor: 'hover:bg-pink-700',
    icon: '🔍'
  },
  aggregator: {
    color: 'bg-cyan-600',
    hoverColor: 'hover:bg-cyan-700',
    icon: '📊'
  }
};

export const DraggableNode = ({ type, label }) => {
  const config = nodeConfig[type] || {
    color: 'bg-gray-600',
    hoverColor: 'hover:bg-gray-700',
    icon: '📦'
  };

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.7';
  };

  return (
    <div
      className={`
        ${config.color} 
        ${config.hoverColor}
        transition-colors
        duration-200
        cursor-grab
        min-w-[100px]
        h-[60px]
        rounded-lg
        shadow-md
        flex
        items-center
        justify-center
        gap-2
        text-white
        font-medium
        select-none
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => event.target.style.opacity = '1'}
      draggable
    >
      <span className="text-lg">{config.icon}</span>
      <span>{label}</span>
    </div>
  );
};
