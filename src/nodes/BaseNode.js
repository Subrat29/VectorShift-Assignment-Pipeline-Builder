import React from 'react';
import { Handle, Position } from 'reactflow';
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../redux/flowSlice';

const HandleStyles = {
  width: '12px',
  height: '12px',
  background: 'white',
  border: '2px solid #6966FF',
  borderRadius: '50%',
  zIndex: 5,
};

export const createHandle = ({ type, position, id, style = {}, ...props }) => (
  <Handle
    type={type}
    position={position}
    id={id}
    style={{ ...HandleStyles, ...style }}
    {...props}
  />
);

export const BaseNode = ({
  id,
  data,
  title,
  inputs = [],
  outputs = [],
  children,
  minHeight = 80,
  width = 280,
}) => {
  const dispatch = useDispatch();

  const updateField = (fieldName, fieldValue) => {
    dispatch(updateNodeField({ nodeId: id, fieldName, fieldValue }));
  };

  return (
    <div className="react-flow__node-default" style={{
      padding: '12px',
      background: 'white',
      border: '1px solid #bbb',
      borderRadius: '8px',
      width: `${width}px`,
      minHeight: `${minHeight}px`,
      position: 'relative',
    }}>
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
        }}>{title}</span>
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => {
        const yPosition = (index + 1) * (100 / (inputs.length + 1));
        return createHandle({
          key: `input-${input.id}`,
          type: 'target',
          position: Position.Left,
          id: `${id}-${input.id}`,
          style: { left: '-6px', top: `${yPosition}%` },
          ...(input.props || {})
        });
      })}

      {/* Node Content */}
      <div style={{ padding: '0 8px' }}>
        {React.Children.map(children, child =>
          React.cloneElement(child, { updateField, data })
        )}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => {
        const yPosition = (index + 1) * (100 / (outputs.length + 1));
        return createHandle({
          key: `output-${output.id}`,
          type: 'source',
          position: Position.Right,
          id: `${id}-${output.id}`,
          style: { right: '-6px', top: `${yPosition}%` },
          ...(output.props || {})
        });
      })}
    </div>
  );
};

// Field Components for Reuse
export const TextField = ({ label, value, onChange, placeholder }) => (
  <div style={{ marginBottom: '8px' }}>
    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
      {label}:
    </label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '13px'
      }}
    />
  </div>
);

export const SelectField = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: '8px' }}>
    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
      {label}:
    </label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '13px'
      }}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);