
const BASIC_URL = 'https://json-server-shop.adaptable.app/'
const FAKE_STORE_API = 'https://fakestoreapi.com'
const DUMMY_API = 'https://dummyjson.com'
const UNIQ_ID = 1000
const SHOPS = {
	1: 'FakeStore',
	2: 'Dummy'
}

const ERRORS_SIGN_UP = {
	firstName: 'Name must contain only letters*',
	lastName: 'Last name must contain only letters*',
	email: 'Incorrect email',
	password:
		'Password must contain at least 1 capital letter and be  min. length 8 ',
	confirmPassword: 'Password must match',
	phoneNumber: 'Please enter the valid number',
	companyName: 'Company name must contain only letters',
	street: 'Street must contain only letters',
	city: 'City must contain only letters',
	index: 'Index must contain only numbers',
};
const ERROR_DIFFERENT_PASSWORD = 'Password mismatch'
export {
	BASIC_URL,
	FAKE_STORE_API,
	DUMMY_API,
	UNIQ_ID,
	SHOPS,
	ERRORS_SIGN_UP,
	ERROR_DIFFERENT_PASSWORD
}