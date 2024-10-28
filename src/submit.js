import { useSelector } from 'react-redux';
import { selectNodes, selectEdges } from './redux/flowSlice';

export const SubmitButton = () => {
    const nodes = useSelector(selectNodes);
    const edges = useSelector(selectEdges);

    const onSubmit = async () => {
        try {
            // const r = JSON.stringify({ nodes, edges });
            // console.log(r);
            // console.log({ nodes, edges });
            console.log("Nodes = ", nodes)
            console.log("Edges = ", edges)

            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            alert(`Number of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            console.error('Failed to parse pipeline:', error);
            alert(`Failed to submit pipeline: ${error.message}`);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
    );
};
