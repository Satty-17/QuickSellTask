import React, { useEffect, useState } from 'react';
import { Card, DropdownMenu } from '../component';
import useFetch from '../hooks/useFetch';
import { groupAndSortTickets } from '../utils/utils';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');
    const [groupedAndSortedTickets, setGroupedAndSortedTickets] = useState({});

    const data = useFetch('https://api.quicksell.co/v1/internal/frontend-assignment');

    useEffect(() => {
        if (data) {
            setTickets(data.tickets);
            setUsers(data.users);
            setLoading(false);
            console.log(data);
        }
    }, [data]);

    useEffect(() => {
        console.log("groupbyy", groupBy)
        const grpnsrt = () => {
            const result = groupAndSortTickets(tickets, groupBy, sortBy);
            setGroupedAndSortedTickets(result);
            console.log(result);
        };

        grpnsrt();
    }, [tickets, groupBy, sortBy]);

    const groupContainerStyle = {
        
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto', // to enable horizontal scrolling
        padding: '10px',
        gap: '20px' // space between each group
    };

    const getGroupHeading = (groupBy, groupKey) => {
        switch (groupBy) {
            case 'status':
                return `${groupKey}`;
            case 'userId':
                const user = users.find((user) => user.id === groupKey);
                return user ? `${user.name}` : `${groupKey}`;
            case 'priority':
                const priorityLabels = {
                    0: 'No Priority',
                    1: 'Low',
                    2: 'Medium',
                    3: 'High',
                    4: 'Urgent',
                };
                return `${priorityLabels[groupKey] || groupKey}`;
            default:
                return groupKey; // If none of the above, use the groupKey as is
        }
    };
    
    
    
    
    

    return (
        <div>
            <DropdownMenu setGroupBy={setGroupBy} setSortBy={setSortBy} />
            {/* Container for the horizontal groups */}
            <div style={groupContainerStyle}>
                {/* Iterate over groupedAndSortedTickets */}
                {Object.keys(groupedAndSortedTickets).map((groupKey) => (
                    <div key={groupKey} className="group">
                        <h3>{getGroupHeading(groupBy, groupKey)}</h3>
                        {console.log("users", users)}
                        {/* Render Card component for each ticket */}
                        {groupedAndSortedTickets[groupKey].map((ticket) => (
                            <Card id={ticket.id} title={ticket.title} userImage={""} tag={ticket.tag} status={ticket.status} priority={ticket.priority} groupBy={groupBy} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )};

export default Dashboard;
