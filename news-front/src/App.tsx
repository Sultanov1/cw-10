import {Route, Routes} from 'react-router-dom';
import Toolbar from './features/items/components/Toolbar';
import NewsList from './features/items/containers/NewsList';
import NewsForm from './features/items/containers/NewsForm';


const App = () => {
  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main style={{padding: '20px'}}>
        <Routes>
          <Route path='/' element={<NewsList/>}/>
          <Route path='/add-news' element={<NewsForm/>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;