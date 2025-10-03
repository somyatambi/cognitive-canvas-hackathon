import { Handle, Position, type NodeProps } from 'reactflow';
import './index.css'; // Make sure your css is imported

// Define a type for the data prop for better TypeScript support
type CustomNodeData = {
  label: string;
  icon: string;
  color: string;
  agentName: string;
};

const CustomNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <div className="custom-node" style={{ borderTop: `4px solid ${data.color}` }}>
      <Handle type="target" position={Position.Top} />
      <div className="custom-node-header">
        <span className="custom-node-icon">{data.icon}</span>
        <span className="custom-node-agent-name">{data.agentName}</span>
      </div>
      <div className="custom-node-content">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;