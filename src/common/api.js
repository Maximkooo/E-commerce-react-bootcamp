import axios from "axios";
import { FAKE_STORE_API, DUMMY_API } from "./constants";


const getProductsFakeStoreApi = () => {
  return axios.get(`${FAKE_STORE_API}/products`);
}
const getProductByIdFakeStoreApi = (product) => {
  return axios.get(`${FAKE_STORE_API}/products/${product}`);
}
const getProductByIdDummyApi = (product) => {
  return axios.get(`${DUMMY_API}/products/${product}`);
}

const getProductsDummyApi = () => {
  return axios.get(`${DUMMY_API}/products`);
}

const getProductsByQueryDummyApi = (query) => {
  return axios.get(`${DUMMY_API}/products/search?q=${query}`);
}

const getAllProductsByQuery = (query) => {
  return axios.all([getProductsFakeStoreApi(), getProductsByQueryDummyApi(query)])
}

const getCategoriesFakeStoreApi = () => {
  return axios.get(`${FAKE_STORE_API}/products/categories`);
}

const getCategoriesDummyApi = () => {
  return axios.get(`${DUMMY_API}/products/categories`);
}

const getCategoryByQueryFakeStoreApi = (category) => {
  return axios.get(`${FAKE_STORE_API}/products/category/${category}`);
}

const getCategoryByQueryDummyApi = (category) => {
  return axios.get(`${DUMMY_API}/products/category/${category}`);
}

export {
  getProductsFakeStoreApi,
  getProductsDummyApi,
  getProductsByQueryDummyApi,
  getAllProductsByQuery,
  getCategoriesFakeStoreApi,
  getCategoriesDummyApi,
  getCategoryByQueryFakeStoreApi,
  getCategoryByQueryDummyApi,
  getProductByIdFakeStoreApi,
  getProductByIdDummyApi
}