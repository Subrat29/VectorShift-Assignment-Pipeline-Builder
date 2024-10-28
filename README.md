# Pipeline Builder 🌐

This project combines a **React-based frontend** with a **FastAPI backend** to create a dynamic, user-friendly pipeline builder. Users can design, connect, and manage nodes within a flowchart-style interface, while the backend validates pipeline structures as Directed Acyclic Graphs (DAGs). 

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components Overview](#components-overview)

---

## Features ✨

- **Frontend**:
  - Create, connect, and manage pipeline nodes
  - Search and filter nodes in the toolbar
  - Drag and drop nodes onto the canvas
  - Toggle between fullscreen and normal view
  - Adjust grid size for alignment
  - Responsive design for different screen sizes

- **Backend**:
  - Pipeline structure validation
  - Directed Acyclic Graph (DAG) detection for pipelines

---

## Technologies Used 💻

- **Frontend**:
  - **React**: For building the user interface
  - **Redux**: Manages global state efficiently
  - **React Flow**: For visualizing node-based applications
  - **Lucide Icons**: Enhances the UI with icons
  - **Tailwind CSS**: Styles the application with utility-first CSS

- **Backend**:
  - **FastAPI**: For handling HTTP requests and API creation
  - **Pydantic**: For data validation and parsing

---

## Installation 🚀

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Subrat29/pipeline-builder-frontend.git
   cd pipeline-builder-frontend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   - Open your browser and go to `http://localhost:3000`.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Subrat29/backend.git
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

4. Run the FastAPI application:
   ```bash
   uvicorn main:app --reload
   or 
   python -m uvicorn main:app --reload
   ```
   - The API will be available at `http://127.0.0.1:8000`.

---

## Usage 🧩

- **Frontend**:
  - **Creating Nodes**: Drag and drop nodes from the toolbar onto the canvas.
  - **Connecting Nodes**: Drag from a node’s output handle to another node’s input handle.
  - **Editing Nodes**: Click on a node to edit its properties.
  - **Search**: Use the search bar to filter nodes by label.
  - **Fullscreen Mode**: Click the fullscreen button to expand the canvas.
  - **Grid Size Adjustment**: Use the slider to adjust the grid size for alignment.

- **Backend**:
  - The backend validates the structure of the pipeline, ensuring it forms a DAG.

---

## API Endpoints 📡

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

## Components Overview 🧱

### Frontend Components

- **PipelineToolbar**: Toolbar containing draggable nodes and the search bar.
- **BaseNode**: Base component for custom nodes with input/output handles.
- **TextField**: Reusable text input for node properties.
- **SelectField**: Reusable select dropdown for node properties.
- **DraggableNode**: Draggable node component in the toolbar.
- **PipelineCanvas**: Main canvas for creating and connecting nodes.
- **Node**: Represents a node on the canvas with handles.
- **ConnectionLine**: Line representing connections between nodes.
- **FullscreenButton**: Button to toggle fullscreen mode.
- **GridSizeSlider**: Slider to adjust the grid size on the canvas.

---

Enjoy building and connecting nodes effortlessly with **Pipeline Builder**! 🎉