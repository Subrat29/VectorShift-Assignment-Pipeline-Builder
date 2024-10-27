// inputNode.js
import React, { useState, useEffect } from 'react';
import { BaseNode, TextField, SelectField } from './BaseNode'; // Import BaseNode and field components
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../redux/flowSlice';

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
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={[{ id: 'value', type: 'source' }]}
    >
      {/* Replace individual input fields with reusable field components */}
      <TextField
        label="Name"
        value={currName}
        onChange={setCurrName}
      />
      <SelectField
        label="Type"
        value={inputType}
        onChange={setInputType}
        options={[{ value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }]}
      />
    </BaseNode>
  );
};
