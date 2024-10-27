import { BaseNode, TextField, SelectField } from './BaseNode';
import React from 'react'

// 3. Timer Node
export const TimerNode = ({ id, data }) => {
  const [interval, setInterval] = React.useState(data?.interval || '1000');
  const [unit, setUnit] = React.useState(data?.unit || 'ms');

  React.useEffect(() => {
    if (interval) data.updateField?.('interval', interval);
  }, [interval]);

  React.useEffect(() => {
    if (unit) data.updateField?.('unit', unit);
  }, [unit]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Timer"
      outputs={[{ id: 'trigger' }]}
    >
      <TextField
        label="Interval"
        value={interval}
        onChange={setInterval}
        placeholder="1000"
      />
      <SelectField
        label="Unit"
        value={unit}
        onChange={setUnit}
        options={[
          { value: 'ms', label: 'Milliseconds' },
          { value: 's', label: 'Seconds' },
          { value: 'm', label: 'Minutes' }
        ]}
      />
    </BaseNode>
  );
};