import Toolbar from './features/news/components/Toolbar.tsx';
import {Route, Routes} from 'react-router-dom';
import NewsList from './features/news/containers/NewsList.tsx';
import NewsForm from './features/news/containers/NewsForm.tsx';

const App = () => {
    return (
        <>
          <header>
            <Toolbar/>
          </header>
          <main style={{padding: '20px'}}>
            <Routes>
              <Route path='/' element={<NewsList/>}/>
              <Route path='/add-news' element={<NewsForm/>}></Route>
            </Routes>
          </main>
        </>
    );
};

export default App;