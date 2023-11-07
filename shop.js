require("dotenv").config();
const axios = require('axios');

const GetTransactions = async () => {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://easydonate.ru/api/v3/plugin/EasyDonate.LastPayments/getPayments',
		headers: { 
			'Shop-key': process.env.SHOP_KEY
		}
	};

	var result = await axios.request(config);
	return result.data.response;
}
const GetProducts = async () => {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: 'https://easydonate.ru/api/v3/shop/products',
		headers: { 
			'Shop-key': process.env.SHOP_KEY
		}
	};

	var result = await axios.request(config);
	return result.data.response;
}

https://easydonate.ru/api/v3/shop/products

exports.getTransactions = GetTransactions;
exports.getProducts = GetProducts;