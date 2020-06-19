import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadRepositories();
  }, [])

  async function loadRepositories(){
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: '',
      techs: ['React Native','ReactJS', 'Node.js'],
      likes: 0
    });
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
              <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
