import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';

function AuthorForm({ show, author, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    function: '',
    organization: '',
    status: 'Offline',
    employed: '',
    image: '/assets/img/team-2.jpg'
  });

  useEffect(() => {
    if (author) {
      const employed = author.employed ? new Date(author.employed).toISOString().split('T')[0] : '';
      setFormData({
        ...author,
        employed
      });
    } else {
      setFormData({
        name: '',
        email: '',
        function: '',
        organization: '',
        status: 'Offline',
        employed: '',
        image: '/assets/img/team-2.jpg'
      });
    }
  }, [author]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className="bg-gray-100 border-0">
        <Modal.Title className="text-dark font-weight-bold">
          {author ? 'Edit Author' : 'Add Author'}
        </Modal.Title>
        <button
          type="button"
          className="btn-close text-dark"
          onClick={onClose}
          aria-label="Close"
        />
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Form onSubmit={handleSubmit}>
          <div className="card-body">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="form-control-lg"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="form-control-lg"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Function</Form.Label>
              <Form.Select
                name="function"
                value={formData.function}
                onChange={handleChange}
                className="form-control-lg"
                required
              >
                <option value="">Select function</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Enter organization"
                className="form-control-lg"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control-lg"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Employed</Form.Label>
              <Form.Control
                type="date"
                name="employed"
                value={formData.employed}
                onChange={handleChange}
                className="form-control-lg"
                required
              />
            </Form.Group>
          </div>
          <div className="card-footer border-0 pt-0 d-flex justify-content-end">
            <Button
              variant="light"
              onClick={onClose}
              className="me-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {author ? 'Update' : 'Add'} Author
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

AuthorForm.propTypes = {
  show: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    function: PropTypes.string,
    organization: PropTypes.string,
    status: PropTypes.string,
    employed: PropTypes.string,
    image: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AuthorForm;
