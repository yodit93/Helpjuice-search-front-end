const search = document.getElementById('search');

const renderTopQueries = async (inputValue) => {
    const cont = document.querySelector('.queries-cont');
    cont.innerHTML = '';

    const topQueries = await fetchSearchAnalytics(inputValue);
    if(topQueries) {
        topQueries.forEach((entry) => {
            const list = document.createElement('li');
            list.textContent = entry.query;
            cont.appendChild(list);
        });
    }
};

const saveQuery = async (query) => {
  try {
    const response = await fetch('https://helpjuice-search-backend.onrender.com/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      console.log('Query saved successfully');
      renderTopQueries('');
    } else {
      throw new Error('Failed to save query');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchSearchAnalytics = async (inputValue) => {
  try {
    const response = await fetch(`https://helpjuice-search-backend.onrender.com/api/search_queries/analytics?query=${inputValue}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.top_queries;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const handleInputChange = (e) => {
  const inputValue = e.target.value;
  renderTopQueries(inputValue);
};

const handleSearchChange = (e) => {
  const query = e.target.value;
  saveQuery(query);
  search.value = '';
};

search.addEventListener('input', handleInputChange);
search.addEventListener('change', handleSearchChange);

// Initial render
renderTopQueries('');
