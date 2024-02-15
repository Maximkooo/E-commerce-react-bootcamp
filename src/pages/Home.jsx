import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MultiCarousel from '../components/MultiCarousel';
import CardItem from '../components/Card';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CircularProgressBar from '../components/CircularProgressBar';
import {
	getAllProductsByQuery,
	getCategoriesFakeStoreApi,
	getCategoriesDummyApi,
	getCategoryByQueryFakeStoreApi,
	getCategoryByQueryDummyApi,
} from '../common/api';
import { UNIQ_ID } from '../common/constants';
import _ from 'lodash';
import { FooterWithLogo } from '../components/Footer/Footer';

const Home = () => {
	const [searchItems, setSearchItems] = useState([]);
	const [dataForCard, setDataForCard] = useState([]);
	const [dataForCarousel, setDataForCarousel] = useState([]);
	const [isLoad, setIsLoad] = useState(true);

	useEffect(() => {
		getDataForCardByCategory();
		getDataForCarouselByCategory();
	}, []);

	useEffect(() => {
		if (dataForCard.length && dataForCarousel) {
			setIsLoad(false);
		}
	}, [dataForCard, dataForCarousel]);

	const searchHandle = (e) => {
		getAllProductsByQuery(e.target.value).then((res) => {
			setSearchItems([
				...res[0].data
					.filter((item) => item.title.toLowerCase().includes(e.target.value))
					.map((item) => ({
						...item,
						id: item.id + UNIQ_ID,
						rating: item.rating.rate,
						stock: item.rating.count,
						thumbnail: item.image,
						images: [item.image],
						shop: 1,
					})),
				...res[1].data.products.map((item) => ({
					...item,
					shop: 2,
				})),
			]);
		});
	};

	const getDataForCardByCategory = async () => {
		const { data } = await getCategoriesFakeStoreApi();
		const categoryPromises = data.slice(0, 4).map(async (category) => {
			const res = await getCategoryByQueryFakeStoreApi(category);
			return res.data.slice(0, 3).map(el => ({
				...el,
				id: el.id,
				rating: el.rating.rate,
				stock: el.rating.count,
				thumbnail: el.image,
				images: [el.image],
				shop: 1
			}))
		});

		const itemsForCardArray = await axios.all(categoryPromises);
		setDataForCard(itemsForCardArray);
	};

	const getDataForCarouselByCategory = async () => {
		const { data } = await getCategoriesDummyApi();
		const randomCategories = _.sampleSize(data, 8);
		const categoryPromises = randomCategories.map(async (category) => (await getCategoryByQueryDummyApi(category)).data.products);
		const itemsArrays = await Promise.all(categoryPromises);
		const reducedArr = itemsArrays.reduce((acc, items, i) => {
			if (i % 2 === 0) {
				acc.push([...items, ...(itemsArrays[i + 1] || [])]);
			}
			return acc;
		}, []);
		const mutatedItems = reducedArr.map(arr => arr.map(item => ({
			...item,
			shop: 2
		})))
		setDataForCarousel(mutatedItems);
	};

	return (
		<div className='black-background black-color min-h-screen'>
			{isLoad ?
				<CircularProgressBar />
				: (
					<>
						<Navbar />
						<div className='container mx-auto my-5 '>
							<SearchBar options={searchItems} searchHandle={searchHandle} />
							{dataForCard.length > 0 && dataForCard.map((cardItems, idx) => (
								<div key={idx}>
									<div className='grid grid-cols-3' >
										{cardItems.map(item => (
											<CardItem key={item.id} item={item} />
										))}
									</div>
									{dataForCarousel[idx] && <MultiCarousel items={dataForCarousel[idx]} />}
								</div>
							))}
						</div>
						<FooterWithLogo />
					</>
				)}
		</div>
	)
}

export default Home
