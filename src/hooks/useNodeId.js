import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementNodeId, selectNodeIDs } from '../redux/flowSlice';

export const useNodeId = () => {
  const dispatch = useDispatch();
  const nodeIDs = useSelector(selectNodeIDs);
  
  return useCallback((type) => {
    dispatch(incrementNodeId(type));
    return `${type}-${nodeIDs[type] + 1}`;
  }, [dispatch, nodeIDs]);
};