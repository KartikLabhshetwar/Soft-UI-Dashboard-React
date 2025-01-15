import { useState, useEffect } from 'react';
import AuthorsTable from '../components/tables/AuthorsTable';
import ProjectsTable from '../components/tables/ProjectsTable';
import { fetchAuthors, addAuthor, updateAuthor, deleteAuthor } from '../services/api';

function Tables() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const data = await fetchAuthors();
      setAuthors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading authors:', error);
      setLoading(false);
    }
  };

  const handleAddAuthor = async (authorData) => {
    try {
      const newAuthor = await addAuthor(authorData);
      setAuthors(prev => [...prev, newAuthor]);
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const handleEditAuthor = async (authorData) => {
    try {
      const updatedAuthor = await updateAuthor(authorData);
      setAuthors(prev => prev.map(author => 
        author.id === authorData.id ? updatedAuthor : author
      ));
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      await deleteAuthor(authorId);
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