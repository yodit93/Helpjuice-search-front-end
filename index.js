const search = document.getElementById('search');

const saveQuery = async (query) => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query }),
        });

        if (response.ok) {
            console.log('Query saved successfully');
        } else {
            throw new Error('Failed to save query');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const fetchSearchAnalytics = async (inputValue) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/search_queries/analytics?query=${inputValue}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.top_queries;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const renderTopQueries = async (inputValue) => {
    const cont = document.querySelector('.queries-cont');
    cont.innerHTML = '';

    const topQueries = await fetchSearchAnalytics(inputValue);
    topQueries.forEach((entry) => {
        let list = document.createElement('li');
        list.textContent = entry.query;
        cont.appendChild(list);
    });
};

const handleInputChange = (e) => {
    const inputValue = e.target.value;
    renderTopQueries(inputValue);
};

const handleSearchChange = (e) => {
    const query = e.target.value;
    saveQuery(query);
    search.value = '';
    renderTopQueries('');
};

search.addEventListener('input', handleInputChange);
search.addEventListener('change', handleSearchChange);

// Initial render
renderTopQueries('');
