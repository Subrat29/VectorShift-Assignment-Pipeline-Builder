import { BaseNode, TextField, SelectField } from './BaseNode';
import React from 'react'

// 5. Aggregator Node
export const AggregatorNode = ({ id, data }) => {
  const [operation, setOperation] = React.useState(data?.operation || 'sum');
  const [field, setField] = React.useState(data?.field || '');
  const [window, setWindow] = React.useState(data?.window || '10');

  React.useEffect(() => {
    if (operation) data.updateField?.('operation', operation);
    if (field) data.updateField?.('field', field);
    if (window) data.updateField?.('window', window);
  }, [operation, field, window]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Aggregator"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'result' }]}
    >
      <SelectField
        label="Operation"
        value={operation}
        onChange={setOperation}
        options={[
          { value: 'sum', label: 'Sum' },
          { value: 'avg', label: 'Average' },
          { value: 'min', label: 'Minimum' },
          { value: 'max', label: 'Maximum' },
          { value: 'count', label: 'Count' }
        ]}
      />
      <TextField
        label="Field"
        value={field}
        onChange={setField}
        placeholder="data.value"
      />
      <TextField
        label="Window Size"
        value={window}
        onChange={setWindow}
        placeholder="10"
      />
    </BaseNode>
  );
};