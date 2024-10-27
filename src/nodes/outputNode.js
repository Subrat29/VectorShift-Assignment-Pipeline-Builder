// outputNode.js
import React, { useState } from 'react';
import { BaseNode, TextField, SelectField } from './BaseNode'; // Import BaseNode and field components

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={[{ id: 'input', type: 'target' }]}
      outputs={[{ id: 'output', type: 'source' }]}
    >
      {/* Replace individual input fields with reusable field components */}
      <TextField
        label="Name"
        value={currName}
        onChange={setCurrName}
      />
      <SelectField
        label="Type"
        value={outputType}
        onChange={setOutputType}
        options={[{ value: 'Text', label: 'Text' }, { value: 'Image', label: 'Image' }]}
      />
    </BaseNode>
  );
};
