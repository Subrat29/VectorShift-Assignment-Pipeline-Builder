import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../redux/flowSlice';
import React from 'react'

export const InputNode = ({ id, data }) => {
  const dispatch = useDispatch();
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  useEffect(() => {
    dispatch(updateNodeField({ nodeId: id, fieldName: 'inputName', fieldValue: currName }));
  }, [currName, dispatch, id]);

  useEffect(() => {
    dispatch(updateNodeField({ nodeId: id, fieldName: 'inputType', fieldValue: inputType }));
  }, [inputType, dispatch, id]);

  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <div>
        <span>Input</span>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>
        <label>
          Type:
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
      />
    </div>
  );
};