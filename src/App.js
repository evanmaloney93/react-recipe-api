import React, {useEffect, useState} from 'react';
import Recipe from './recipe';
import './App.css';

const App = () => {

  const APP_ID = '46d1ee85';
  const APP_KEY = '0064d352293830aa8153a3d6424b74e3';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');


  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className='App'>
      <form onSubmit={getSearch} className="search-form">
        <input type='text' className='search-bar' value ={search} onChange={updateSearch}></input>
        <button  type='submit' className='search-button'>
          Search
        </button>
      </form>

      <div className='recipies'>
      {recipes.map(recipe =>(
        <Recipe key= {recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>

    </div>
  );
}

export default App;
