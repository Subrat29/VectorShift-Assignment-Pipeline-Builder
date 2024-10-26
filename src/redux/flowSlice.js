// src/redux/flowSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge as reactFlowAddEdge,
  MarkerType,
} from 'reactflow';

const initialState = {
  nodes: [],
  edges: [],
  nodeIDs: {}
};

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNodes: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    updateEdges: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    addEdge: (state, action) => {
      const newEdge = {
        ...action.payload,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          height: '20px',
          width: '20px'
        }
      };
      state.edges = reactFlowAddEdge(newEdge, state.edges);
    },
    updateNodeField: (state, action) => {
      const { nodeId, fieldName, fieldValue } = action.payload;
      const node = state.nodes.find(node => node.id === nodeId);
      if (node) {
        node.data = {
          ...node.data,
          [fieldName]: fieldValue
        };
      }
    },
    incrementNodeId: (state, action) => {
      const type = action.payload;
      state.nodeIDs[type] = (state.nodeIDs[type] || 0) + 1;
    }
  }
});

export const {
  addNode,
  updateNodes,
  updateEdges,
  addEdge,
  updateNodeField,
  incrementNodeId
} = flowSlice.actions;

// Selectors
export const selectNodes = (state) => state.flow.nodes;
export const selectEdges = (state) => state.flow.edges;
export const selectNodeIDs = (state) => state.flow.nodeIDs;

export default flowSlice.reducer;