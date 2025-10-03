import { Handle, Position, type NodeProps } from 'reactflow';

// Define the data structure for your custom node
export interface CustomNodeData {
  label: string;
  icon: string;
  color: string;
}

// Custom Node Component
const CustomNode = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <div
      style={{
        backgroundColor: data.color,
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Handle for top (target) connections */}
      <Handle type="target" position={Position.Top} />

      {/* Display emoji icon next to text label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span role="img" aria-label="icon">
          {data.icon}
        </span>
        <span>{data.label}</span>
      </div>

      {/* Handle for bottom (source) connections */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
