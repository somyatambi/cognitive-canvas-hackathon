import { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  type Node, // Import the Node type for TypeScript
  type Connection,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';

// The node that appears when the application first loads.
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'My New Business Idea' },
    position: { x: 250, y: 5 },
  },
];

// A simple counter to ensure all new nodes have a unique ID.
let id = 2;
const getUniqueId = () => `${id++}`;

const App = () => {
  // These are hooks from the React Flow library to manage the state of our canvas.
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds: Edge[]) => addEdge(params, eds)), [setEdges]);
  
  // This state stores information about the context menu. We use `any` for simplicity in a hackathon.
  const [menu, setMenu] = useState<any>(null);

  // This function is called when you right-click on a node.
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Prevent the default browser right-click menu
      event.preventDefault();

      const pane = (event.target as HTMLElement).closest('.react-flow');
      if (!pane) return;
      
      const bounds = pane.getBoundingClientRect();
      const position = {
        top: event.clientY - bounds.top,
        left: event.clientX - bounds.left,
      };

      // Set the menu state with the node's info and position
      setMenu({
        id: node.id,
        ...position,
        data: node.data,
      });
    },
    [setMenu],
  );

  // This function closes the context menu when you click on the canvas background.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  // This is the core function that calls our backend AI agents.
  const handleAgentInvoke = async (agentType: string, sourceNode: any) => {
    setMenu(null); // Close the context menu
    
    // The URL points to our Docker Nginx Gateway.
    const endpoint = `http://localhost:8080/${agentType}`;
    
    console.log(`Calling ${agentType} agent for prompt: "${sourceNode.data.label}"`);

    try {
      // Send the request to the backend using Axios.
      const response = await axios.post(endpoint, {
        prompt: sourceNode.data.label 
      });

      const aiResponseText = response.data.response;
      
      // Create a new node object for the AI's response.
      const newNode: Node = {
        id: getUniqueId(),
        data: { label: aiResponseText },
        position: { x: menu.left, y: menu.top + 50 },
      };
      
      // Create a new edge to connect the original node to the new AI-generated node.
      const newEdge = {
        id: `e-${sourceNode.id}-${newNode.id}`,
        source: sourceNode.id,
        target: newNode.id,
        animated: true,
      };

      // Update the state to add the new node and edge, which makes them appear on the canvas.
      setNodes((nds: Node[]) => nds.concat(newNode));
      setEdges((eds: Edge[]) => eds.concat(newEdge));

    } catch (error) {
      console.error("Error calling AI agent:", error);
      alert("Failed to get a response from the AI agent. Make sure your backend is running!");
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>

        {/* This is our custom context menu */}
        {menu && (
          <div
            style={{ top: menu.top, left: menu.left }}
            className="context-menu"
          >
            <p className="context-menu-header">Node: "{menu.data.label}"</p>
            <button onClick={() => handleAgentInvoke('brainstorm', {id: menu.id, data: menu.data})}>
              🧠 Brainstorm
            </button>
            <button onClick={() => handleAgentInvoke('criticize', {id: menu.id, data: menu.data})}>
              🧐 Criticize
            </button>
          </div>
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default App;