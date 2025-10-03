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
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'My New Business Idea', icon: '💡', color: '#ffffff' },
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
  const [selectionModal, setSelectionModal] = useState<any>(null);

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
        position: node.position,
      });
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => {
    setMenu(null);
    setSelectionModal(null);
  }, [setMenu, setSelectionModal]);

  // THIS IS THE FULL, WORKING FUNCTION YOU NEED
  const handleAgentInvoke = async (agentType: string, sourceNode: any, customPrompt?: string) => {
    setMenu(null);
    const endpoint = `http://localhost:8080/${agentType}`;
    const promptToSend = customPrompt || sourceNode.data.label;
    
    try {
      if (agentType === 'roadmap') {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: promptToSend }) });
        const aiResponseText = await response.text();
        const phases = aiResponseText.split('\n').filter(line => /^\d/.test(line.trim()));
        let previousNodeId = sourceNode.id;
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        phases.forEach((phase: string, index: number) => {
          const [title, description] = phase.split(' :: ');
          const newNodeId = getUniqueId();
          const newNode: Node = { id: newNodeId, className: 'new-node', type: 'custom', data: { label: `${title.trim()}\n\n${description ? description.trim() : ''}`, icon: '🗺️', color: '#e3f2fd' }, position: { x: sourceNode.position.x, y: sourceNode.position.y + 150 * (index + 1) } };
          newNodes.push(newNode);
          const newEdge: Edge = { id: `e-${previousNodeId}-${newNodeId}`, source: previousNodeId, target: newNodeId, type: 'smoothstep' };
          newEdges.push(newEdge);
          previousNodeId = newNodeId;
        });
        setNodes((nds) => nds.concat(newNodes));
        setEdges((eds) => eds.concat(newEdges));
      } else {
        const firstNodeId = getUniqueId();
        let icon = '💡';
        let color = '#fff';
        if (customPrompt) { icon = '💬'; color = '#f3e5f5'; }
        else if (agentType === 'brainstorm') { icon = '🧠'; color = '#e0f7fa'; }
        else if (agentType === 'criticize') { icon = '🧐'; color = '#ffebee'; }

        const firstNewNode: Node = { id: firstNodeId, type: 'custom', className: 'new-node', data: { label: '', icon, color }, position: { x: sourceNode.position.x, y: sourceNode.position.y + 150 } };
        const firstNewEdge: Edge = { id: `e-${sourceNode.id}-${firstNodeId}`, source: sourceNode.id, target: firstNodeId, animated: true, type: 'smoothstep' };
        setNodes((nds) => nds.concat(firstNewNode));
        setEdges((eds) => eds.concat(firstNewEdge));

        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: promptToSend }) });
        if (!response.body) throw new Error("Response has no body");
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          fullResponse += decoder.decode(value);
          setNodes((currentNodes) => currentNodes.map((node) => node.id === firstNodeId ? { ...node, data: { ...node.data, label: fullResponse } } : node));
        }
        if (agentType === 'brainstorm' && !customPrompt) {
            const criticResponseStream = await fetch('http://localhost:8080/criticize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: fullResponse }) });
            if (!criticResponseStream.body) return;
            const criticNodeId = getUniqueId();
            const criticNode: Node = { id: criticNodeId, type: 'custom', className: 'new-node', data: { label: '', icon: '🧐', color: '#ffebee' }, position: { x: firstNewNode.position.x + 450, y: firstNewNode.position.y } };
            const criticEdge: Edge = { id: `e-${firstNewNode.id}-${criticNodeId}`, source: firstNewNode.id, target: criticNodeId, animated: true, type: 'smoothstep' };
            setNodes((nds) => nds.concat(criticNode));
            setEdges((eds) => eds.concat(criticEdge));
            const criticReader = criticResponseStream.body.getReader();
            let criticFullResponse = '';
            while (true) {
                const { value, done } = await criticReader.read();
                if (done) break;
                criticFullResponse += decoder.decode(value);
                setNodes((currentNodes) => currentNodes.map((node) => node.id === criticNodeId ? { ...node, data: { ...node.data, label: criticFullResponse } } : node));
            }
        }
      }
    } catch (error) {
      console.error("Error calling AI agent:", error);
      alert("Failed to get a response from the AI agent. Make sure your backend is running!");
    }
  };

  const handleSelectIdea = () => {
    if (!menu) return;
    const ideas = menu.data.label.split('\n').map((line: string) => line.trim()).filter((line: string) => /^\d/.test(line));
    if (ideas.length > 0) {
      setSelectionModal({ sourceNode: { id: menu.id, position: menu.position }, ideas: ideas });
    } else {
      handleCreateFocusedNode(menu.data.label);
    }
    setMenu(null);
  };

  const handleCreateFocusedNode = (selectedIdea: string) => {
    if (!selectionModal && !menu) return;
    const sourceNode = selectionModal ? selectionModal.sourceNode : menu;
    const cleanedLabel = selectedIdea.replace(/^\d+\.\s*/, '').trim();
    const newNode: Node = { id: getUniqueId(), type: 'custom', className: 'new-node', data: { label: cleanedLabel, icon: '🎯', color: '#fffbe6' }, position: { x: sourceNode.position.x, y: sourceNode.position.y + 150 } };
    const newEdge: Edge = { id: `e-${sourceNode.id}-${newNode.id}`, source: sourceNode.id, target: newNode.id, type: 'smoothstep' };
    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));
    setSelectionModal(null);
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
          <div style={{ top: menu.top, left: menu.left }} className="context-menu">
            <p className="context-menu-header">Node: "{menu.data.label}"</p>
            <button onClick={() => handleAgentInvoke('brainstorm', {id: menu.id, data: menu.data, position: menu.position})}>
              🧠 Brainstorm
            </button>
            <button onClick={() => handleAgentInvoke('criticize', {id: menu.id, data: menu.data, position: menu.position})}>
              🧐 Criticize
            </button>
            <button onClick={() => handleAgentInvoke('roadmap', {id: menu.id, data: menu.data, position: menu.position})}>
              🗺️ Generate Roadmap
            </button>
            <button onClick={handleSelectIdea}>
              ✨ Select & Expand Idea
            </button>
          </div>
        )}
        
        {selectionModal && (
          <div className="selection-modal-overlay">
            <div className="selection-modal">
              <h3>Select an Idea to Expand</h3>
              <div className="idea-list">
                {selectionModal.ideas.map((idea: string, index: number) => (
                  <button key={index} onClick={() => handleCreateFocusedNode(idea)}>
                    {idea}
                  </button>
                ))}
              </div>
              <button className="close-button" onClick={() => setSelectionModal(null)}>Close</button>
            </div>
          </div>
        )}

      </ReactFlowProvider>
    </div>
  );
};

export default App;