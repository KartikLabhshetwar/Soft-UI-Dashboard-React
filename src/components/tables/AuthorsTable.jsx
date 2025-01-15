import { useState } from 'react';
import PropTypes from 'prop-types';
import AuthorForm from './AuthorForm';

function AuthorsTable({ authors, onEdit, onDelete, onAdd }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleEdit = (author) => {
    setSelectedAuthor(author);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedAuthor(null);
  };

  const handleFormSubmit = (formData) => {
    if (selectedAuthor) {
      onEdit({ ...formData, id: selectedAuthor.id });
    } else {
      onAdd(formData);
    }
    handleFormClose();
  };

  return (
    <div className="card mb-4 custom-table-card">
      <div className="card-header pb-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Authors table</h6>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowForm(true)}
          >
            Add Author
          </button>
        </div>
      </div>
      <div className="card-body px-0 pt-0 pb-2">
        <div className="table-responsive">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id}>
                  <td>
                    <div className="d-flex px-2 py-1">
                      <div>
                        <img src={author.image} className="avatar avatar-sm me-3" alt={author.name} />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="mb-0 text-sm">{author.name}</h6>
                        <p className="text-xs text-secondary mb-0">{author.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs font-weight-bold mb-0">{author.function}</p>
                    <p className="text-xs text-secondary mb-0">{author.organization}</p>
                  </td>
                  <td className="align-middle text-center text-sm">
                    <span className={`badge badge-sm bg-gradient-${author.status === 'Online' ? 'success' : 'secondary'}`}>
                      {author.status}
                    </span>
                  </td>
                  <td className="align-middle text-center">
                    <span className="text-secondary text-xs font-weight-bold">{author.employed}</span>
                  </td>
                  <td className="align-middle">
                    <button
                      onClick={() => handleEdit(author)}
                      className="text-secondary font-weight-bold text-xs border-0 bg-transparent"
                      style={{ cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(author.id)}
                      className="text-danger font-weight-bold text-xs border-0 bg-transparent ms-2"
                      style={{ cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AuthorForm
        show={showForm}
        author={selectedAuthor}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

AuthorsTable.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      function: PropTypes.string,
      organization: PropTypes.string,
      status: PropTypes.string,
      employed: PropTypes.string,
      image: PropTypes.string
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default AuthorsTable;
