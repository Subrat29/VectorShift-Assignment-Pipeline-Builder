import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNode,
  updateNodes,
  updateEdges,
  addEdge,
  selectNodes,
  selectEdges
} from './redux/flowSlice';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { useNodeId } from './hooks/useNodeId';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const dispatch = useDispatch();
  const getNodeID = useNodeId();
  
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: `${type}`
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
  
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
  
        dispatch(addNode(newNode));
      }
    },
    [reactFlowInstance, dispatch, getNodeID]
  );

  const onNodesChange = useCallback(
    (changes) => {
      dispatch(updateNodes(changes));
    },
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      dispatch(updateEdges(changes));
    },
    [dispatch]
  );

  const onConnect = useCallback(
    (connection) => {
      dispatch(addEdge(connection));
    },
    [dispatch]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};