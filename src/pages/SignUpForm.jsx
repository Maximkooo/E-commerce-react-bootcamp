import axios from 'axios';
import React, { useState } from 'react';
import { ERRORS_SIGN_UP, ERROR_DIFFERENT_PASSWORD } from '../common/constants';
import { isEmail, isNumeric, isStrongPassword, isAlpha } from 'validator';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

const SignUpForm = () => {
	const [isCorporate, setIsCorporate] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const [userStorage, setUserStorage] = useState({
		id: uuidv4(),
		firstName: {
			value: '',
			valid: false,
		},
		lastName: {
			value: '',
			valid: false,
		},
		email: { value: '', valid: false },
		password: {
			value: '',
			valid: false,
		},
		confirmPassword: {
			value: '',
			valid: false,
		},
		isCorporate: {
			value: false,
			valid: true,
		},
		corporateStorage: {
			phoneNumber: {
				value: '',
				valid: false,
			},
			companyName: {
				value: '',
				valid: false,
			},
			address: {
				street: {
					value: '',
					valid: false,
				},
				index: {
					value: '',
					valid: false,
				},
				city: {
					value: '',
					valid: false,
				},
			},
		},
	});

	const userHandleChange = (event) => {
		const { name, value } = event.target;
		let isValid = false;

		switch (name) {
			case 'firstName':
			case 'lastName':
			case 'street':
			case 'companyName':
			case 'city':
				isValid = isAlpha(value);
				break;
			case 'email':
				isValid = isEmail(value);
				break;
			case 'password':
			case 'confirmPassword':
				isValid = isStrongPassword(value);
				break;
			case 'phoneNumber':
			case 'index':
				isValid = isNumeric(value);
				break;
		}

		requiredInputHandler(name, value, isValid, event.target.alt);
	};
	const requiredInputHandler = (name, value, valid, alt) => {
		if (name === 'index') {
			if (isNaN(+value)) {
				value = value.replace(/[^0-9]/g, '');
			}
		}
		setUserStorage((prevUserStorage) => ({
			...prevUserStorage,
			corporateStorage: {
				...prevUserStorage.corporateStorage,
				...(alt === 'corporateStorage'
					? {
						[name]: { value, valid },
						address: { ...prevUserStorage.corporateStorage.address },
					}
					: alt === 'address'
						? { address: { ...prevUserStorage.corporateStorage.address, [name]: { value, valid } } }
						: {}),
			},
			...(alt.length === 0 ? { [name]: { value, valid } } : {}),
		}));
	};

	const checkCorporateHandler = () => {
		setIsCorporate(true);
		setUserStorage((prevUserStorage) => ({
			...prevUserStorage,
			isCorporate: {
				value: true,
				valid: true,
			}
		}))

	};
	const checkUserHandler = () => {
		setIsCorporate(false);
		setUserStorage((prevUserStorage) => ({
			...prevUserStorage,
			isCorporate: {
				value: false,
				valid: true,
			}
		}))

	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const errorKey = findInvalidField(userStorage)
		if ((userStorage.password.value !== userStorage.confirmPassword.value) || errorKey) {
			errorKey ? setErrorMessage(ERRORS_SIGN_UP[errorKey]) : setErrorMessage(ERROR_DIFFERENT_PASSWORD)
		}
		else {
			console.log(userStorage);
			axios.post(`https://json-server-shop.adaptable.app/users`, userStorage)
			navigate('/');
		}
	};

	const findInvalidField = (obj, prefix = '', originalKey) => {
		for (const key in obj) {
			const currentKey = prefix ? `${prefix}.${key}` : key;
			if (prefix.includes('corporateStorage') && userStorage.isCorporate.value === false) {
				continue;
			}
			if (typeof obj[key] === 'object') {
				const result = findInvalidField(obj[key], currentKey, key);
				if (result) {
					return result;
				}
			}
			else if (key === 'valid' && obj[key] === false) {
				return originalKey;
			}
		}
		return null;
	};

	// const deleteUser = () => {
	// 	axios.delete(`https://json-server-shop.adaptable.app/users/0b12e583-b006-4258-a16c-495e17bcd15e`)
	// }
	// deleteUser()
	return (
		<div className="container mx-auto px-4 py-4">
			<form onSubmit={handleSubmit} className="max-w-md mx-auto">
				<h3 className=" text-center">Choose type of Account</h3>
				<div className="grid mb-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-2 p-4">
					<label>
						<input
							onChange={checkUserHandler}
							type="radio"
							value="1"
							className="peer hidden"
							name="framework"
							defaultChecked
						/>

						<div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
							<h6 className=" text-gray-700">User</h6>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-9 h-9 text-blue-600 invisible group-[.peer:checked+&]:visible"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</label>

					<label>
						<input
							onChange={checkCorporateHandler}
							type="radio"
							value="1"
							className="peer hidden"
							name="framework"
						/>

						<div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
							<h6 className=" text-gray-700">Corporate</h6>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-9 h-9 text-blue-600 invisible group-[.peer:checked+&]:visible"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</label>
				</div>
				<div className="grid md:grid-cols-2 md:gap-6">
					<div className="relative z-0 w-full mb-5 group">
						<input
							onChange={userHandleChange}
							value={userStorage.firstName.value}
							name="firstName"
							type="text"
							id="floating_first_name"
							className=" pl-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							htmlFor="floating_first_name"
							className="peer-focus: ml-2 font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
						>
							First name
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							value={userStorage.lastName.value}
							onChange={userHandleChange}
							type="text"
							name="lastName"
							id="floating_last_name"
							className="pl-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							htmlFor="floating_last_name"
							className="peer-focus:font-medium ml-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
						>
							Last name
						</label>
					</div>
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						value={userStorage.email.value}
						onChange={userHandleChange}
						type="email"
						name="email"
						id="floating_email"
						className="pl-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=""
						required
					/>
					<label
						htmlFor="floating_email"
						className="peer-focus:font-medium ml-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
					>
						Email address
					</label>
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						autoComplete="off"
						value={userStorage.password.value}
						onChange={userHandleChange}
						type="password"
						name="password"
						id="floating_password"
						className="block py-2.5 px-0 w-full pl-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_password"
						className="peer-focus:font-medium absolute ml-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
					>
						Password
					</label>
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						autoComplete="off"
						value={userStorage.confirmPassword.value}
						onChange={userHandleChange}
						type="password"
						name="confirmPassword"
						id="floating_repeat_password"
						className="pl-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_repeat_password"
						className="peer-focus:font-medium absolute ml-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
					>
						Confirm password
					</label>
				</div>
				{isCorporate && (
					<>
						<div className="relative z-0 w-full mb-5 group">
							<div className="relative z-0 w-full mb-5 group">
								<input
									value={userStorage.corporateStorage.phoneNumber.value}
									onChange={userHandleChange}
									type="tel"
									pattern="[0-9]{10}"
									name="phoneNumber"
									id="floating_phone"
									className="pl-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required
									alt='corporateStorage'
								/>
								<label
									htmlFor="phoneNumber"
									className="peer-focus:font-medium absolute ml-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
								>
									Phone number (123-456-7890)
								</label>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<input
									value={userStorage.corporateStorage.companyName.value}
									onChange={userHandleChange}
									type="text"
									name="companyName"
									id="floating_company"
									className="pl-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required
									alt='corporateStorage'
								/>
								<label
									htmlFor="companyName"
									className="peer-focus:font-medium absolute ml-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
								>
									Company Name (Ex. Google)
								</label>
							</div>
							<div className="relative z-0 w-full mb-5 group">
								<h4 className=" text-center">Company Address</h4>
								<div className="relative z-0 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
									<input
										name="street"
										value={userStorage.corporateStorage.address.street.value}
										onChange={userHandleChange}
										className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder="Street"
										type="text"
										alt='address'
									/>

									<input
										name="index"
										value={userStorage.corporateStorage.address.index.value}
										onChange={userHandleChange}
										className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder="Index"
										type="text"
										maxLength="6"
										alt='address'
									/>

									<input
										name="city"
										value={userStorage.corporateStorage.address.city.value}
										onChange={userHandleChange}
										className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder="City"
										type="text"
										alt='address'
									/>
								</div>
							</div>
						</div>
					</>
				)}
				{errorMessage && <p className=" text-red-600">{errorMessage}</p>}
				<div className="w-full ">
					<button
						type="submit"
						className="my-0 mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
