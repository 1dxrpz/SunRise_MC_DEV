require("dotenv").config();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcrypt');
const { decodeJWTToken } = require('./auth.js');

var con = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

const query = util.promisify(con.query).bind(con);

const GetUser = async (login) => {
	try {
		const rows = await query(`SELECT * FROM TestUsers WHERE \`email\`="${login}" OR \`username\`="${login}"`);
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
				password: password,
				isVerified: 0
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
const VerifyUser = async (user) => {
	
	try {
		var hash = await bcrypt.hash(user.password, 10);
		const rows = await query(`REPLACE INTO \`TestUsers\` (\`id\`, \`email\`, \`username\`, \`password\`, \`isVerified\`) 
			VALUES ('${user.id}', '${user.email}', '${user.username}', '${hash}', '1');
		`);
		return {
			status: 200,
			data: {
				id: user.id,
				email: user.email,
				username: user.username,
				password: user.password,
				isVerified: 1
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

const UpdateUserPassword = async (user, password, newPassword) => {
	try {
		var currentPasswordCorrect = await bcrypt.compare(password, user.password);
		if (currentPasswordCorrect) {
			var hash = await bcrypt.hash(newPassword, 10);
			const rows = await query(`REPLACE INTO \`TestUsers\` (\`id\`, \`email\`, \`username\`, \`password\`) 
				VALUES (${user.id}, '${user.email}', '${user.username}', '${hash}')`);
			return {
				status: 200,
				data: {
					id: user.id,
					email: user.email,
					username: user.username,
					password: hash
				}
			};
		} else {
			return {
				status: 403,
				message: "Wrong password"
			};
		}
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
exports.updateUserPassword = UpdateUserPassword;
exports.verifyUser = VerifyUser;