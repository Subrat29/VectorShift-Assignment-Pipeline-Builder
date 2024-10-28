# Pipeline Builder Frontend

This project is a frontend application for a pipeline builder, allowing users to create, connect, and manage different types of nodes in a flowchart-style interface. It is built using React and Redux, along with the `react-flow` library for handling the visual representation of the nodes and edges.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components Overview](#components-overview)

## Features

- Create and connect nodes to form a pipeline.
- Search and filter nodes in the toolbar.
- Drag and drop nodes onto the canvas.
- Toggle between fullscreen and normal view.
- Adjust grid size for better alignment of nodes.
- Responsive design for various screen sizes.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: State management library to manage the global state.
- **React Flow**: Library for building node-based applications and visualizations.
- **Lucide Icons**: A set of icons used for better UI representation.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pipeline-builder-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pipeline-builder-frontend
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

- **Creating Nodes**: Drag and drop nodes from the toolbar onto the canvas.
- **Connecting Nodes**: Click on a node's output handle and drag to another node's input handle to create a connection.
- **Editing Nodes**: Click on a node to edit its properties or fields.
- **Search**: Use the search bar in the toolbar to filter nodes by their labels.
- **Fullscreen Mode**: Click the fullscreen button in the top right corner to expand the canvas to full screen.
- **Grid Size Adjustment**: Use the slider in the top right corner to adjust the grid size for better alignment of nodes.

## Components Overview

- **PipelineToolbar**: The toolbar that contains draggable nodes and the search bar.
- **BaseNode**: The base component for creating custom nodes with input and output handles.
- **TextField**: A reusable text input component for node properties.
- **SelectField**: A reusable select dropdown component for node properties.
- **DraggableNode**: A component representing a draggable node in the toolbar.
- **PipelineCanvas**: The main canvas component for creating and connecting nodes.
- **Node**: The component representing a node on the canvas with input and output handles.
- **ConnectionLine**: A line component representing a connection between nodes.
- **FullscreenButton**: A button component to toggle fullscreen mode.
- **GridSizeSlider**: A slider component to adjust the grid size on the canvas.
