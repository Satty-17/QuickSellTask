function groupTickets(tickets, groupKey) {
    return tickets.reduce((acc, ticket) => {
      const key = ticket[groupKey];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {});
  }
  
  // Example usage:
//   const ticketsByStatus = groupTickets(tickets, 'status');
//   const ticketsByUser = groupTickets(tickets, 'userId');
//   const ticketsByPriority = groupTickets(tickets, 'priority');
  
//   console.log('Grouped by Status:', ticketsByStatus);
//   console.log('Grouped by User:', ticketsByUser);
//   console.log('Grouped by Priority:', ticketsByPriority);

  
export function groupAndSortTickets(tickets, groupKey, sortKey) {
    const groupedTickets = groupTickets(tickets, groupKey);
  
    Object.keys(groupedTickets).forEach(group => {
      groupedTickets[group].sort((a, b) => {
        if (sortKey === 'priority') {
          // For priority, sort in descending order (higher priority first)
          return b[sortKey] - a[sortKey];
        } else if (sortKey === 'title') {
          // For title, sort in ascending order (alphabetically)
          return a[sortKey].localeCompare(b[sortKey]);
        }
      });
    });
  
    return groupedTickets;
  }

  