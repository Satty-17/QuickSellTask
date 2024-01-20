import React from 'react';
import '../styles/card.css';

const Card = ({ id, title, userImage, tag, status, priority, groupBy }) => {
  const statusIcon = status === 'Done' ? '🟢' : '🔴';

  // Map priorities to corresponding icons
  const priorityIcons = {
    '1': '1.png', // Replace with the actual image filename for  1
    '2': '2.png', // Replace with the actual image filename for  2
    '3': '3.png',
    '4': '4.png',
    '0': '0.png', // Replace with the actual image filename for priority 3
    // Add more priorities as needed
  };

  // Get the corresponding priority icon image source
  const priorityIconSrc = priorityIcons[priority] || 'default_priority.png'; // Default image if not found

  // Trim title to 30 characters and append "..." if it exceeds
  const trimmedTitle = title.length > 60 ? title.substring(0, 60) + '...' : title;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-info">
          <div className="card-top">
            <span className="card-id">{id}</span>
            {groupBy !== 'status' && <span className="status-icon">{statusIcon}</span>}
          </div>
          <h4>{trimmedTitle}</h4>
        </div>
        {groupBy !== 'userId' && <img src={userImage} alt="User" className="user-image" />}
      </div>
      <div className="card-body">
        {groupBy !== 'priority' && <img height={24} src={`/${priorityIconSrc}`} alt={`Priority ${priority}`} className="priority-icon" />}
        <p className="card-tag">{tag}</p>
      </div>
    </div>
  );
};

export default Card;
