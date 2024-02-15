// import

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import profileSimple from '../../assets/profile-simple.svg';
import { Link } from 'react-router-dom';
const navigation = [];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example() {
	return (
		<Disclosure as="nav" className=" bg-transparent">
			<>
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="flex items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex flex-shrink-0 items-center">
								<Link to="/">
									<img
										className="h-8 w-auto"
										src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
										alt="Your Company"
									/>
								</Link>
							</div>
							<div className="hidden sm:ml-6 sm:block"></div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<Link to="/checkout">
								<button
									type="button"
									className="relative rounded-full p-1 text-black focus:outline-none"
								>
									<span className="absolute -inset-1.5" />
									<span className="sr-only">View cart</span>
									{/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
										/>
									</svg>
								</button>
							</Link>

							{/* Profile dropdown */}
							<Menu as="div" className="relative ml-3">
								<div>
									<Menu.Button className="relative flex rounded-full  text-sm focus:outline-none">
										<span className="absolute -inset-1.5" />
										<span className="sr-only">Open user menu</span>
										<img
											className="h-8 w-8 rounded-full"
											src={profileSimple}
											alt=""
										/>
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<Menu.Item>
											{({ active }) => (
												<a
													href="#"
													className={classNames(
														active ? 'bg-gray-100' : '',
														'block px-4 py-2 text-sm text-gray-700'
													)}
												>
													Your Profile
												</a>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<Link
													to="/sign-up"
													href="#"
													className={classNames(
														active ? 'bg-gray-100' : '',
														'block px-4 py-2 text-sm text-gray-700'
													)}
												>
													Sign up
												</Link>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<a
													href="#"
													className={classNames(
														active ? 'bg-gray-100' : '',
														'block px-4 py-2 text-sm text-gray-700'
													)}
												>
													Sign out
												</a>
											)}
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</>
		</Disclosure>
	);
}
