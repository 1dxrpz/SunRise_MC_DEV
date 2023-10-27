require("dotenv").config();
const jwt = require("jsonwebtoken");

const GenerateJWTToken = async (data) => {
	return await jwt.sign(JSON.stringify(data), process.env.JWT_KEY);
}
const DecodeJWTToken = async (data) => {
	var token = undefined;
	try {
		token = await jwt.verify(data, process.env.JWT_KEY);
	} catch(e) {
		token = undefined;
	}
	return token;
}

exports.generateJWTToken = GenerateJWTToken;
exports.decodeJWTToken = DecodeJWTToken;