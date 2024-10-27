import { BaseNode, TextField, SelectField } from './BaseNode';
import React from 'react'

// nodes/TransformNode.js
export const TransformNode = ({ id, data }) => {
  const [transform, setTransform] = React.useState(data?.transform || 'uppercase');

  React.useEffect(() => {
    if (transform) data.updateField?.('transform', transform);
  }, [transform]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <SelectField
        label="Transform Type"
        value={transform}
        onChange={setTransform}
        options={[
          { value: 'uppercase', label: 'To Uppercase' },
          { value: 'lowercase', label: 'To Lowercase' },
          { value: 'capitalize', label: 'Capitalize' },
          { value: 'reverse', label: 'Reverse' }
        ]}
      />
    </BaseNode>
  );
};