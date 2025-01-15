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
      image: `/assets/img/team-${(newId % 4) + 1}.jpg` // Add a default image
    };
    authors = [...authors, newAuthor];
    return newAuthor;
  } catch {
    // Even if the API call fails, we'll still add the author locally
    // since we're using a mock API
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
    // Even if the API call fails, we'll still update the author locally
    // since we're using a mock API
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
    // Even if the API call fails, we'll still delete the author locally
    // since we're using a mock API
    authors = authors.filter(author => author.id !== id);
    return true;
  }
};

export const fetchUserStats = async () => {
  try {
    // Using JSONPlaceholder data for stats
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
