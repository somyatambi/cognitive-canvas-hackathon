import { Handle, Position, type NodeProps } from 'reactflow';
import './index.css';

type CustomNodeData = {
  label: string;
  icon: string;
  color: string;
  agentName: string;
};

const TaskNode = ({ data, id }: NodeProps<CustomNodeData>) => {
  // Parse tasks with categories and effort estimates
  const parseTask = (line: string) => {
    const categoryMatch = line.match(/^(🚀|🎯|📈)/);
    const effortMatch = line.match(/\(Effort:\s*(\d+)h?\)/i);
    
    let category = 'task';
    let categoryLabel = 'Task';
    if (categoryMatch) {
      const emoji = categoryMatch[1];
      if (emoji === '🚀') { category = 'quick'; categoryLabel = 'Quick Win'; }
      else if (emoji === '🎯') { category = 'core'; categoryLabel = 'Core'; }
      else if (emoji === '📈') { category = 'growth'; categoryLabel = 'Growth'; }
    }
    
    const effort = effortMatch ? parseInt(effortMatch[1]) : 2;
    
    // Clean the task text
    let taskText = line
      .replace(/^(🚀|🎯|📈)\s*/, '')
      .replace(/\(Effort:\s*\d+h?\)/i, '')
      .trim();
    
    // Split into title and description
    const [title, ...descParts] = taskText.split('-');
    const description = descParts.join('-').trim();
    
    return { category, categoryLabel, effort, title: title.trim(), description };
  };

  const tasks = data.label
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Accept lines starting with emojis OR containing "Effort:" (task lines)
      return trimmed && (
        /^(🚀|🎯|📈)/.test(trimmed) || 
        trimmed.includes('Effort:')
      );
    })
    .map(parseTask);

  return (
    <div className="task-node" style={{ borderTop: `4px solid ${data.color}` }}>
      <Handle type="target" position={Position.Top} />
      
      <div className="custom-node-header">
        <span className="custom-node-icon">{data.icon}</span>
        <span className="custom-node-agent-name">{data.agentName}</span>
      </div>

      <div className="task-node-content">
        {tasks.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
            <p>{data.label || 'Generating tasks...'}</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className={`task-card task-${task.category}`}>
              <div className="task-header">
                <input 
                  type="checkbox" 
                  id={`task-${id}-${index}`}
                  className="task-checkbox"
                />
                <label htmlFor={`task-${id}-${index}`} className="task-title">
                  {task.title}
                </label>
                <span className={`task-badge badge-${task.category}`}>
                  {task.categoryLabel}
                </span>
              </div>
              {task.description && (
                <div className="task-description">{task.description}</div>
              )}
              <div className="task-footer">
                <span className="task-effort">
                  ⏱️ {task.effort}h
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TaskNode;
