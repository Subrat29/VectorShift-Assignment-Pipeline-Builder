import React from 'react'
import { BaseNode, TextField, SelectField } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [endpoint, setEndpoint] = React.useState(data?.endpoint || '');
  const [method, setMethod] = React.useState(data?.method || 'GET');

  React.useEffect(() => {
    if (endpoint) data.updateField?.('endpoint', endpoint);
  }, [endpoint]);

  React.useEffect(() => {
    if (method) data.updateField?.('method', method);
  }, [method]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      inputs={[
        { id: 'headers' },
        { id: 'body' }
      ]}
      outputs={[
        { id: 'response' }
      ]}
    >
      <TextField
        label="Endpoint"
        value={endpoint}
        onChange={setEndpoint}
        placeholder="https://api.example.com/data"
      />
      <SelectField
        label="Method"
        value={method}
        onChange={setMethod}
        options={[
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]}
      />
    </BaseNode>
  );
};