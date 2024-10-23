import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Packages from './pages/Packages/Packages';
import PackagesList from './pages/PackagesList/PackagesList';
import CreatePackage from './pages/CreatePackage/CreatePackage';
import DetailedPackage from './pages/DetailedPackage/DetailedPackage';
import Sections from './pages/Sections/Sections';
import DetailedSection from './pages/DetailedSection/DetailedSection';
import PopularPlaces from './pages/PopularPlaces/PopularPlaces';
import PrivateRoutes from './utils/PrivateRoutes';
import Category from './pages/Category/Category';
import CreateCategory from './pages/Category/CreateCategory';
import Location from './pages/Location/Location';
import CreateLocation from './pages/Location/CreateLocation';
import GoogleReviews from './pages/Reviews/GoogleReviews';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />} >
        
          <Route path='/' element={<Packages />}>
          </Route>
          <Route path='/packages' element={<Packages />}>
          </Route>
          <Route path='/packages/popularplaces' element={<PopularPlaces />}>
          </Route>
          <Route path='/packages/sections' element={<Sections />}>
          </Route>
          <Route path='/packages/sections/:id' element={<DetailedSection />}>
          </Route>
          <Route path='/packages/list' element={<PackagesList />}>
          </Route>
          <Route path='/packages/create' element={<CreatePackage />}>
          </Route>
          <Route path='/packages/category' element={<Category />}>
          </Route>
          <Route path='/packages/locations' element={<Location />}>
          </Route>
          <Route path='/packages/category/new' element={<CreateCategory />}>
          </Route>
          <Route path='/packages/locations/new' element={<CreateLocation />}>
          </Route>
          <Route path='/packages/:id' element={<DetailedPackage />}>
          </Route>
          <Route path='/reviews/google' element={<GoogleReviews />}>
          </Route>

          </Route>
          <Route path='/login' element={<Login />}>
          </Route>
          </Routes>
      
    </div>
  );
}

export default App;
