require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bcrypt = require('bcrypt');

const { validateRegister, validateLogin } = require('./validator.js');
const { createUser, getUser, findUser } = require('./database.js');
const { generateJWTToken, decodeJWTToken } = require('./auth.js');

app.use(cors());
app.use(express.json());

app.get(
	'/user',
	async (req, res) => {
		const token = req.header("Authorization").replace("Bearer", "").trim();
		const decoded = await decodeJWTToken(token);
		res.send(decoded);
	}
);

app.post(
	'/login',
	async (req, res) => {
		const {error, value} = validateLogin(req.body);

		if (error) {
			return res.json(error.details);
		}
		const { email, password } = req.body;
		var user = await getUser(email);

		if (user.status == 200) {
			var isMatch = await bcrypt.compare(password, user.data.password);

			if (!isMatch) {
				res.json([{
					message: "Неверный пароль"
				}]);
			} else {
				const token = await generateJWTToken(user.data);
				user.token = token;
				res.send(user);
			}
		} else {
			res.json([{
				message: "Пользователь не найден"
			}]);
		}
	}
);

app.post(
	'/register',
	async (req, res) => {
		const {error, value} = validateRegister(req.body);

		if (error) {
			return res.send(error.details);
		}
		const { email, nickname, password } = req.body;
		var user = await findUser(email, nickname);

		if (user.status == 200) {
			res.json([{
				message: "Пользователь уже зарегистрирован"
			}]);
		} else {
			var user = await createUser(email, nickname, password);
			const token = await generateJWTToken(user.data);
			user.token = token;
			res.json(user);
		}
	}
);


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});