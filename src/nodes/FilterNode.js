import { BaseNode, TextField, SelectField } from './BaseNode';
import React from 'react'

// 4. Filter Node
export const FilterNode = ({ id, data }) => {
  const [field, setField] = React.useState(data?.field || '');
  const [operator, setOperator] = React.useState(data?.operator || 'equals');
  const [value, setValue] = React.useState(data?.value || '');

  React.useEffect(() => {
    if (field) data.updateField?.('field', field);
    if (operator) data.updateField?.('operator', operator);
    if (value) data.updateField?.('value', value);
  }, [field, operator, value]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputs={[{ id: 'input' }]}
      outputs={[
        { id: 'match' },
        { id: 'nomatch' }
      ]}
    >
      <TextField
        label="Field"
        value={field}
        onChange={setField}
        placeholder="data.field"
      />
      <SelectField
        label="Operator"
        value={operator}
        onChange={setOperator}
        options={[
          { value: 'equals', label: 'Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'greater', label: 'Greater Than' },
          { value: 'less', label: 'Less Than' }
        ]}
      />
      <TextField
        label="Value"
        value={value}
        onChange={setValue}
        placeholder="Compare value"
      />
    </BaseNode>
  );
};
