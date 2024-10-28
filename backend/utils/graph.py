import networkx as nx

def check_dag(edges):
    # Create a directed graph
    graph = nx.DiGraph()
    graph.add_edges_from(edges)

    # Check if the graph is a directed acyclic graph (DAG)
    return nx.is_directed_acyclic_graph(graph)
