// textNode.js
import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode'; // Import BaseNode
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../redux/flowSlice';

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
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={variables.map(variable => ({ id: variable, type: 'target' }))}
      outputs={[{ id: 'output', type: 'source' }]}
    >
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here. Use {{variableName}} for variables..."
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
          overflowY: 'auto'
        }}
      />
    </BaseNode>
  );
};
