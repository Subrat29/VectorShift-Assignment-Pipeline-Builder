# FastAPI Pipeline Backend

This repository contains a FastAPI backend for parsing pipeline data, which includes nodes and edges. It validates the pipeline structure and checks if it forms a Directed Acyclic Graph (DAG).

## Features

- **Pipeline Parsing**: Accepts nodes and edges as input and returns the number of nodes, edges, and whether the pipeline is a DAG.
- **Data Validation**: Ensures that the provided pipeline has a valid structure.

## Installation

To get started with this backend, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://Subrat29/backend/backend.git
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```

## Running the Application

To run the FastAPI application, use the following command:

```bash
uvicorn main:app --reload
```

- The API will be available at `http://127.0.0.1:8000`.

## API Endpoints

### Parse Pipeline

- **Endpoint**: `POST /parse`
- **Request Body**:
    ```json
    {
        "nodes": [
            {"id": "node1", "data": {"name": "Node 1"}},
            {"id": "node2", "data": {"name": "Node 2"}}
        ],
        "edges": [
            {"from": "node1", "to": "node2"}
        ]
    }
    ```

- **Response**:
    ```json
    {
        "num_nodes": 2,
        "num_edges": 1,
        "is_dag": true
    }
    ```
---