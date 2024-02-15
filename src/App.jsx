import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUpForm from './pages/SignUpForm';
import './index.css';
import Product from './pages/Product';
import CheckoutPage from './pages/CheckoutPage';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/sign-up" element={<SignUpForm />} />
			<Route path="/product/:company/:id" element={<Product />} />
			<Route path="/checkout" element={<CheckoutPage />} />
		</Routes>
	);
}

export default App;
