import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Tables = () => {
  const [authors, setAuthors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: ''
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      // Using JSONPlaceholder as a dummy API
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const transformedData = response.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'Author',
        status: Math.random() > 0.5 ? 'Active' : 'Inactive'
      }));
      setAuthors(transformedData);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingAuthor(null);
    setFormData({ name: '', email: '', role: '', status: '' });
  };

  const handleShow = (author = null) => {
    if (author) {
      setEditingAuthor(author);
      setFormData(author);
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAuthor) {
        // Update existing author
        await axios.put(`https://jsonplaceholder.typicode.com/users/${editingAuthor.id}`, formData);
        setAuthors(authors.map(author => 
          author.id === editingAuthor.id ? { ...author, ...formData } : author
        ));
      } else {
        // Create new author
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
        setAuthors([...authors, { ...formData, id: response.data.id }]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving author:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setAuthors(authors.filter(author => author.id !== id));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <h4>Authors Table</h4>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => handleShow()}>
            Add Author
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table className="align-items-center mb-0">
          <thead>
            <tr>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Role</th>
              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
              <th className="text-secondary opacity-7">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>
                  <div className="d-flex px-2 py-1">
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">{author.name}</h6>
                      <p className="text-xs text-secondary mb-0">{author.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="text-xs font-weight-bold mb-0">{author.role}</p>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className={`badge badge-sm bg-gradient-${author.status === 'Active' ? 'success' : 'secondary'}`}>
                    {author.status}
                  </span>
                </td>
                <td>
                  <Button variant="link" className="text-secondary font-weight-bold text-xs" onClick={() => handleShow(author)}>
                    Edit
                  </Button>
                  <Button variant="link" className="text-danger font-weight-bold text-xs" onClick={() => handleDelete(author.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingAuthor ? 'Edit Author' : 'Add Author'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingAuthor ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Tables; 