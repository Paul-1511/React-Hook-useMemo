import React, { useState, useMemo } from 'react';

const UserSearch = () => {
  // Estado para la lista de usuarios inicial
  const [users, setUsers] = useState([
    {
      name: 'Juan Pérez', 
      description: 'Me gusta programar en React y ver anime'
    },
    {
      name: 'Monkey D. Luffy',
      description: 'Futuro Rey de los Piratas que quiere encontrar el One Piece'
    },
    {
      name: 'Roronoa Zoro',
      description: 'Espadachín que busca convertirse en el mejor del mundo'
    },
    {
      name: 'Nami',
      description: 'Navegante que sueña con dibujar un mapa del mundo entero'
    },
    {
      name: 'Sanji',
      description: 'Cocinero que busca el All Blue y nunca pelea con las manos'
    }
  ]);

  // Estado para el texto de búsqueda
  const [searchText, setSearchText] = useState('');
  
  // Estado para el nuevo usuario
  const [newUser, setNewUser] = useState({
    name: '',
    description: ''
  });

  // Función para manejar cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Función para manejar cambios en los inputs del nuevo usuario
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para agregar un nuevo usuario
  const addUser = () => {
    if (newUser.name.trim() && newUser.description.trim()) {
      setUsers(prev => [...prev, newUser]);
      setNewUser({
        name: '',
        description: ''
      });
    }
  };

  // useMemo para calcular la lista filtrada solo cuando cambia searchText o users
  const filteredUsers = useMemo(() => {
    console.log('Recalculando lista filtrada...');
    return users.filter(user => 
      user.name.toLowerCase().includes(searchText.toLowerCase()) || 
      user.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, users]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Buscador de Usuarios de One Piece</h1>
      
      {/* Input de búsqueda */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar usuarios por nombre o descripción..."
          value={searchText}
          onChange={handleSearchChange}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      {/* Formulario para agregar nuevo usuario */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Agregar nuevo usuario</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={newUser.name}
            onChange={handleNewUserChange}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={newUser.description}
            onChange={handleNewUserChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button 
          onClick={addUser}
          style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Agregar Usuario
        </button>
      </div>
      
      {/* Lista de usuarios filtrados */}
      <div>
        <h2>Usuarios encontrados: {filteredUsers.length}</h2>
        {filteredUsers.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredUsers.map((user, index) => (
              <li key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '5px' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{user.name}</h3>
                <p style={{ margin: 0, color: '#666' }}>{user.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron usuarios que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default UserSearch;