import axios from 'axios';

// Maintain local state for authors
let authors = [];

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const fetchAuthors = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    authors = response.data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      function: ['Manager', 'Developer', 'Designer'][Math.floor(Math.random() * 3)],
      organization: user.company.name,
      status: Math.random() > 0.5 ? 'Online' : 'Offline',
      employed: formatDate(Date.now() - Math.random() * 31536000000),
      image: `/assets/img/team-${(user.id % 4) + 1}.jpg`
    }));
    return authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
};

export const addAuthor = async (authorData) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', authorData);
    const newId = response.data.id || Date.now();
    const newAuthor = {
      ...authorData,
      id: newId,
      employed: formatDate(authorData.employed),
      image: `/assets/img/team-${(newId % 4) + 1}.jpg`
    };
    authors = [...authors, newAuthor];
    return newAuthor;
  } catch {
    const newId = Date.now();
    const newAuthor = {
      ...authorData,
      id: newId,
      employed: formatDate(authorData.employed),
      image: `/assets/img/team-${(newId % 4) + 1}.jpg`
    };
    authors = [...authors, newAuthor];
    return newAuthor;
  }
};

export const updateAuthor = async (authorData) => {
  try {
    await axios.put(`https://jsonplaceholder.typicode.com/users/${authorData.id}`, authorData);
    const updatedAuthor = {
      ...authorData,
      employed: formatDate(authorData.employed),
      image: authorData.image || `/assets/img/team-${(authorData.id % 4) + 1}.jpg`
    };
    authors = authors.map(author => author.id === authorData.id ? updatedAuthor : author);
    return updatedAuthor;
  } catch {
    const updatedAuthor = {
      ...authorData,
      employed: formatDate(authorData.employed),
      image: authorData.image || `/assets/img/team-${(authorData.id % 4) + 1}.jpg`
    };
    authors = authors.map(author => author.id === authorData.id ? updatedAuthor : author);
    return updatedAuthor;
  }
};

export const deleteAuthor = async (id) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    authors = authors.filter(author => author.id !== id);
    return true;
  } catch {
    authors = authors.filter(author => author.id !== id);
    return true;
  }
};

export const fetchUserStats = async () => {
  try {
    const [users, posts, comments] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/comments')
    ]);

    return {
      activeUsers: users.data.length * 160,
      activeUsersIncrease: 55,
      clicks: posts.data.length * 35,
      clicksIncrease: 124,
      purchases: Math.floor(comments.data.length / 2),
      purchasesIncrease: 15,
      likes: comments.data.length,
      likesIncrease: 90
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return {
      activeUsers: 1600,
      activeUsersIncrease: 55,
      clicks: 357,
      clicksIncrease: 124,
      purchases: 2300,
      purchasesIncrease: 15,
      likes: 940,
      likesIncrease: 90
    };
  }
};

export const fetchSalesData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return {
      labels: months,
      datasets: [{
        label: 'Sales',
        data: response.data.slice(0, 6).map(() => Math.floor(Math.random() * 1000 + 500)),
        borderColor: '#cb0c9f',
        tension: 0.4
      }]
    };
  } catch {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales',
        data: [450, 580, 690, 890, 750, 920],
        borderColor: '#cb0c9f',
        tension: 0.4
      }]
    };
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    return response.data.map(todo => ({
      id: todo.id,
      title: todo.title,
      status: todo.completed ? 'done' : Math.random() > 0.5 ? 'pending' : 'scheduled',
      date: formatDate(Date.now() - Math.random() * 604800000) // Random date within last week
    }));
  } catch {
    return [
      { id: 1, title: 'New dashboard design', status: 'done', date: formatDate(Date.now() - 86400000) },
      { id: 2, title: 'Implement user authentication', status: 'pending', date: formatDate(Date.now()) },
      { id: 3, title: 'API integration', status: 'scheduled', date: formatDate(Date.now() + 86400000) }
    ];
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
    return response.data.map(post => ({
      id: post.id,
      item: `Order #${post.id}`,
      date: formatDate(Date.now() - Math.random() * 604800000),
      status: ['Paid', 'Refunded', 'Pending'][Math.floor(Math.random() * 3)],
      customer: post.title.split(' ').slice(0, 2).join(' '),
      revenue: Math.floor(Math.random() * 1000 + 100)
    }));
  } catch {
    return [
      { id: 1, item: 'Order #1', date: formatDate(Date.now()), status: 'Paid', customer: 'John Doe', revenue: 780 },
      { id: 2, item: 'Order #2', date: formatDate(Date.now()), status: 'Pending', customer: 'Jane Smith', revenue: 590 }
    ];
  }
};

export const fetchReviews = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=100');
    const total = response.data.length;
    return {
      reviews: {
        'Positive Reviews': Math.floor((Math.random() * 20) + 70), // 70-90%
        'Neutral Reviews': Math.floor(Math.random() * 20), // 0-20%
        'Negative Reviews': Math.floor(Math.random() * 10) // 0-10%
      },
      developers: total * 15,
      projects: total * 8
    };
  } catch {
    return {
      reviews: {
        'Positive Reviews': 80,
        'Neutral Reviews': 15,
        'Negative Reviews': 5
      },
      developers: 1500,
      projects: 800
    };
  }
};
