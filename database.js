require("dotenv").config();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');

var con = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

const query = util.promisify(con.query).bind(con);

const GetUser = async (email) => {
	try {
		const rows = await query(`SELECT * FROM TestUsers WHERE \`email\`="${email}"`);
		if (rows.length == 0) {
			return {
				status: 404,
				message: "Пользователь не найден"
			};
		}
		return {
			status: 200,
			data: rows[0]
		};
	} catch(e) {
		return {
			status: 503,
			message: "Server error"
		};
	} finally {
	}
}

const FindUser = async (email, username) => {
	try {
		const rows = await query(`SELECT * FROM TestUsers WHERE \`username\`="${username}" OR \`email\`="${email}"`);
		if (rows.length == 0) {
			return {
				status: 404,
				message: "Пользователь не найден"
			};
		}
		return {
			status: 200,
			data: rows[0]
		};
	} catch(e) {
		return {
			status: 503,
			message: "Server error"
		};
	} finally {
	}
}

const CreateUser = async (email, username, password) => {
	try {
		var hash = await bcrypt.hash(password, 10);
		const rows = await query(`INSERT INTO \`TestUsers\` (\`email\`, \`username\`, \`password\`) VALUES ('${email}', '${username}', '${hash}')`);
		return {
			status: 200,
			data: {
				id: rows.insertId,
				email: email,
				username: username,
				password: password
			}
		};
	} catch(e) {
		return {
			status: 503,
			message: "Server error"
		};
	} finally {
	}
}

exports.getUser = GetUser;
exports.findUser = FindUser;
exports.createUser = CreateUser;