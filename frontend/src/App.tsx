import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">amazona</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route
              path="/products/:slug"
              element={<ProductListScreen />}
            ></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
