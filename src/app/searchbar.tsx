import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const results = mockSearch(query);
    setSearchResults(results);
  };

  const mockSearch = (query: string): string[] => {
    const allItems = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];
    return allItems.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <div className="search-bar-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'row' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter a location here..."
          style={{
            flex: 1,
            padding: '10px',
            marginBottom: 0,
            borderRadius: '5px 0 0 5px',
            border: '1px solid #ccc',
            background: '#fff',
            borderRight: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: '1px solid #4CAF50',
            borderRadius: '0 5px 5px 0',
            cursor: 'pointer',
            marginLeft: 0
          }}
        >
          Search
        </button>
      </form>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <ul style={{ marginTop: '20px', listStyleType: 'none', padding: '0' }}>
          {searchResults.map((result, index) => (
            <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #ddd' }}>
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;