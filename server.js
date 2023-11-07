require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

const { validateRegister, validateLogin, validateChangePassword } = require('./validator.js');
const { createUser, getUser, findUser, updateUserPassword, verifyUser } = require('./database.js');
const { generateJWTToken, decodeJWTToken } = require('./auth.js');
const { getTransactions, getProducts } = require('./shop.js');

app.use(cors());
app.use(express.json());

app.get(
	'/transactions',
	async (req, res) => {
		const result = await getTransactions();
		res.send(result);
	}
);

app.get(
	'/products',
	async (req, res) => {
		const result = await getProducts();
		res.send(result);
	}
);

app.get(
	'/user',
	async (req, res) => {
		const token = req.header("Authorization").replace("Bearer", "").trim();
		const decoded = await decodeJWTToken(token);
		res.send(decoded);
	}
);

app.get('/getverify', 
	async (req, res) => {
		const token = req.header("Authorization").replace("Bearer", "").trim();
		const decoded = await decodeJWTToken(token);
		var transporter = nodemailer.createTransport({
			service: 'Mail.ru',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASS
			}
		});

		var mailOptions = {
			from: process.env.EMAIL,
			to: decoded.email,
			subject: 'Верификация аккаунта',
			text: `http://localhost:8080/verify?token=${token}`
		};

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		}); 
	}
);

app.get('/verify', 
	async (req, res) => {
		var { token } = req.query;
		const decoded = await decodeJWTToken(token);
		if (decoded == null) {
			res.send([{message: "error"}])
		} else {
			var result = await verifyUser(decoded);
			res.json(result);
		}
	}
);

app.post(
	'/login',
	async (req, res) => {
		const {error, value} = validateLogin(req.body);

		if (error) {
			return res.json(error.details);
		}
		const { login, password } = req.body;
		var user = await getUser(login);

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

app.post(
	'/changePassword',
	async (req, res) => {
		const {error, value} = validateChangePassword(req.body);

		if (error) {
			return res.send(error.details);
		}
		var { password, newPassword, user } = req.body;
		
		user = await updateUserPassword(user, password, newPassword);
		
		if (user.status == 200) {
			const token = await generateJWTToken(user.data);
			user.token = token;
			res.json(user);
		} else {
			res.json([{
				message: "Неверный пароль"
			}]);
			
		}
	}
);


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});