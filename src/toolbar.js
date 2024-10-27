// 2. Update /frontend/src/toolbar.js
import { DraggableNode } from './draggableNode';

// toolbar.js (update the toolbar to include new nodes)
export const PipelineToolbar = () => {
  const nodeTypes = [
    { type: 'customInput', label: 'Input' },
    { type: 'llm', label: 'LLM' },
    { type: 'customOutput', label: 'Output' },
    { type: 'text', label: 'Text' },
    { type: 'api', label: 'API' },
    { type: 'transform', label: 'Transform' },
    { type: 'timer', label: 'Timer' },
    { type: 'filter', label: 'Filter' },
    { type: 'aggregator', label: 'Aggregator' }
  ];

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-3">
        {nodeTypes.map(node => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
          />
        ))}
      </div>
    </div>
  );
};