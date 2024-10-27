import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../redux/flowSlice';
import React from 'react'

const VARIABLE_REGEX = /\{\{([^{}]+)\}\}/g;
const MAX_NODE_HEIGHT = 300;

export const TextNode = ({ id, data }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  const extractVariables = (inputText) => {
    const matches = Array.from(inputText.matchAll(VARIABLE_REGEX));
    return [...new Set(matches.map(match => match[1].trim()))];
  };

  const adjustTextAreaHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(MAX_NODE_HEIGHT - 40, Math.max(100, textarea.scrollHeight));
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    dispatch(updateNodeField({ nodeId: id, fieldName: 'text', fieldValue: text }));
    const newVariables = extractVariables(text);
    setVariables(newVariables);
    adjustTextAreaHeight();
  }, [text, dispatch, id]);

  useEffect(() => {
    adjustTextAreaHeight();
  }, []);

  return (
    <div className="react-flow__node-default"
      style={{
        padding: '12px',
        background: 'white',
        border: '1px solid #bbb',
        borderRadius: '8px',
        width: '280px',
        position: 'relative',
      }}
    >
      {/* Node Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        color: '#666'
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: 500
        }}>Text</span>
      </div>

      {/* Variables Container */}
      <div style={{
        position: 'absolute',
        left: '-8px',
        top: '40px',
        bottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: `${MAX_NODE_HEIGHT - 50}px`,
        pointerEvents: 'none', // Make container transparent to mouse events
      }}>
        {variables.map((variable) => (
          <div
            key={`${id}-${variable}-container`}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2px',
              zIndex: 1, // Ensure proper stacking
            }}
          >
            <span style={{
              fontSize: '12px',
              color: '#6966FF',
              fontWeight: 500,
              marginRight: '4px',
              position: 'absolute',
              right: '16px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none', // Make text transparent to mouse events
            }}>
              {variable}
            </span>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${variable}`}
              style={{
                width: '12px',
                height: '12px',
                background: 'white',
                border: '2px solid #6966FF',
                borderRadius: '50%',
                zIndex: 5, // Ensure handle is above other elements
                pointerEvents: 'all', // Re-enable pointer events for handle
              }}
            />
          </div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: '100%',
          minHeight: '100px',
          maxHeight: `${MAX_NODE_HEIGHT - 40}px`,
          resize: 'none',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '13px',
          lineHeight: '1.4',
          overflowY: 'auto',
          marginLeft: '40px',
          width: 'calc(100% - 40px)',
          position: 'relative',
          zIndex: 0, // Keep textarea below handles
        }}
        placeholder="Enter text here. Use {{variableName}} for variables..."
      />

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          width: '12px',
          height: '12px',
          background: 'white',
          border: '2px solid #6966FF',
          borderRadius: '50%',
          right: '-6px',
          zIndex: 5, // Ensure handle is above other elements
          pointerEvents: 'all', // Ensure handle can receive mouse events
        }}
      />
    </div>
  );
};