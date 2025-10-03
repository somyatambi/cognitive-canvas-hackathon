import { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  type Node,
  type Connection,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode'; // Make sure your custom node file is named CustomNode.tsx

// Maps the 'custom' type to our CustomNode component
const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: {
      label: 'My New Business Idea',
      icon: '💡',
      color: '#ffffff',
    },
    position: { x: 250, y: 5 },
  },
];

let id = 2;
const getUniqueId = () => `${id++}`;

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const [menu, setMenu] = useState<any>(null);

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      const pane = (event.target as HTMLElement).closest('.react-flow');
      if (!pane) return;
      const bounds = pane.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY - bounds.top,
        left: event.clientX - bounds.left,
        data: node.data,
        position: node.position, // Pass position for accurate placement
      });
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  // CORE FUNCTION - NOW WITH STREAMING AND AGENT-TO-AGENT LOGIC
  const handleAgentInvoke = async (agentType: string, sourceNode: any, customPrompt?: string) => {
    setMenu(null);
    const endpoint = `http://localhost:8080/${agentType}`;
    const promptToSend = customPrompt || sourceNode.data.label;
    
    // --- CREATE THE INITIAL "EMPTY" NODE ---
    const newNodeId = getUniqueId();
    let icon = '💡';
    let color = '#fff';
    // Determine icon and color based on the primary agent call
    if (customPrompt) { icon = '💬'; color = '#f3e5f5'; }
    else if (agentType === 'brainstorm') { icon = '🧠'; color = '#e0f7fa'; }
    else if (agentType === 'criticize') { icon = '🧐'; color = '#ffebee'; }
    else if (agentType === 'roadmap') { icon = '🗺️'; color = '#e3f2fd'; }

    const firstNewNode: Node = {
      id: newNodeId,
      type: 'custom',
      className: 'new-node',
      data: { label: '', icon, color }, // Start with an empty label for streaming
      position: { x: sourceNode.position.x, y: sourceNode.position.y + 150 },
    };
    const firstNewEdge: Edge = { id: `e-${sourceNode.id}-${newNodeId}`, source: sourceNode.id, target: newNodeId, animated: true, type: 'smoothstep' };

    // Render the empty node and edge immediately for instant feedback
    setNodes((nds) => nds.concat(firstNewNode));
    setEdges((eds) => eds.concat(firstNewEdge));

    // --- FETCH AND PROCESS THE STREAM ---
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToSend }),
      });

      if (!response.body) throw new Error("Response has no body");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      // Read from the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunkText = decoder.decode(value);
        fullResponse += chunkText;

        // Update the node's label in real-time
        setNodes((currentNodes) =>
          currentNodes.map((node) =>
            node.id === newNodeId
              ? { ...node, data: { ...node.data, label: fullResponse } }
              : node
          )
        );
      }
      
      // --- AGENT-TO-AGENT CONVERSATION (POST-STREAM) ---
      if (agentType === 'brainstorm' && !customPrompt) {
        console.log(`Auto-triggering Critic agent for: "${fullResponse}"`);
        // We can make the second call a streaming one too
        const criticEndpoint = 'http://localhost:8080/criticize';
        
        const criticNodeId = getUniqueId();
        const criticNode: Node = {
            id: criticNodeId,
            type: 'custom',
            className: 'new-node',
            data: { label: '', icon: '🧐', color: '#ffebee' },
            position: { x: firstNewNode.position.x + 450, y: firstNewNode.position.y },
        };
        const criticEdge: Edge = { id: `e-${firstNewNode.id}-${criticNodeId}`, source: firstNewNode.id, target: criticNodeId, animated: true, type: 'smoothstep' };

        setNodes((nds) => nds.concat(criticNode));
        setEdges((eds) => eds.concat(criticEdge));

        const criticResponseStream = await fetch(criticEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: fullResponse })
        });
        
        if (!criticResponseStream.body) return;
        const criticReader = criticResponseStream.body.getReader();
        let criticFullResponse = '';
        while (true) {
            const { value, done } = await criticReader.read();
            if (done) break;
            const chunkText = decoder.decode(value);
            criticFullResponse += chunkText;
            setNodes((currentNodes) =>
              currentNodes.map((node) =>
                node.id === criticNodeId
                  ? { ...node, data: { ...node.data, label: criticFullResponse } }
                  : node
              )
            );
        }
      }

    } catch (error) {
      console.error("Error calling AI agent:", error);
      alert("Failed to get a response from the AI agent. Make sure your backend is running!");
    }
  };

  const handleRefine = () => {
    if (!menu) return;
    const followUpQuestion = window.prompt(`Ask a follow-up question about:\n\n"${menu.data.label}"`);
    if (followUpQuestion) {
      const detailedPrompt = `Regarding this context: "${menu.data.label}"\n\nMy follow-up question is: "${followUpQuestion}"\n\nProvide a concise answer.`;
      handleAgentInvoke('brainstorm', { id: menu.id, data: menu.data, position: menu.position }, detailedPrompt);
    }
    setMenu(null);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
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

        {menu && (
          <div
            style={{ top: menu.top, left: menu.left }}
            className="context-menu"
          >
            <p className="context-menu-header">Node: "{menu.data.label}"</p>
            <button onClick={() => handleAgentInvoke('brainstorm', {id: menu.id, data: menu.data, position: menu.position})}>
              🧠 Brainstorm
            </button>
            <button onClick={() => handleAgentInvoke('criticize', {id: menu.id, data: menu.data, position: menu.position})}>
              🧐 Criticize
            </button>
            <button onClick={handleRefine}>
              💬 Ask a Question
            </button>
            <button onClick={() => handleAgentInvoke('roadmap', {id: menu.id, data: menu.data, position: menu.position})}>
              🗺️ Generate Roadmap
            </button>
          </div>
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default App;