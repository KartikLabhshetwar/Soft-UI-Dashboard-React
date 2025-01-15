import { useState, useEffect } from 'react';
import AuthorsTable from '../components/tables/AuthorsTable';
import ProjectsTable from '../components/tables/ProjectsTable';

function Tables() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      // Simulated API call - replace with your actual API endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      
      // Format the data to match our schema
      const formattedAuthors = data.map((user, index) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        function: ['Manager', 'Programator', 'Executive'][index % 3],
        organization: ['Organization', 'Developer', 'Projects'][index % 3],
        status: index % 2 === 0 ? 'Online' : 'Offline',
        employed: ['23/04/18', '11/01/19', '19/09/17'][index % 3],
        image: `/assets/img/team-${(index % 4) + 1}.jpg`
      }));
      
      setAuthors(formattedAuthors);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching authors:', error);
      setLoading(false);
    }
  };

  const handleAddAuthor = async (authorData) => {
    try {
      // Simulated API call - replace with your actual API endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData),
      });
      const data = await response.json();
      
      // Add the new author to the state
      setAuthors(prev => [...prev, {
        ...authorData,
        id: data.id || Math.max(...prev.map(a => a.id)) + 1
      }]);
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const handleEditAuthor = async (authorData) => {
    try {
      // Simulated API call - replace with your actual API endpoint
      await fetch(`https://jsonplaceholder.typicode.com/users/${authorData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData),
      });
      
      // Update the author in the state
      setAuthors(prev => prev.map(author => 
        author.id === authorData.id ? authorData : author
      ));
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      // Simulated API call - replace with your actual API endpoint
      await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`, {
        method: 'DELETE',
      });
      
      // Remove the author from the state
      setAuthors(prev => prev.filter(author => author.id !== authorId));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="card">
          <div className="card-body">
            <p className="text-center">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <AuthorsTable
            authors={authors}
            onEdit={handleEditAuthor}
            onDelete={handleDeleteAuthor}
            onAdd={handleAddAuthor}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <ProjectsTable />
        </div>
      </div>
    </div>
  );
}

export default Tables; 