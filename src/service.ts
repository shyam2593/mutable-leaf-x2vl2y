import axios from "axios";

let url = "https://dummyjson.com/products";

export const getCategories = () => {
  return axios
    .get(`${url}/categories`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e.message));
};

export const getProducts = (category: string) => {
  return axios
    .get(`${url}/category/${category}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e.message));
};
