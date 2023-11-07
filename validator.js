const Joi = require('joi');

const validator = (schema) => ( payload ) => 
schema.validate(payload, {abortEarly: false});

const loginSchema = Joi.object({
	login: Joi.string().required()
	.messages({
		'string.base': `Укажите валидный логин`,
		'string.empty': `Поле "Логин" не может быть пустым`,
		'string.min': ``,
		'any.required': `"логин" обязательное поле`
	}),
	password: Joi.string().min(5).max(30).required()
	.messages({
		'string.base': `Укажите валидный пароль`,
		'string.empty': `Поле "пароль" не может быть пустым`,
		'string.min': `Пароль должен содержать в себе минимум 5 символов`,
		'string.max': `Пароль не должен содержать в себе больше 30 символов`,
		'any.required': `"Пароль" обязательное поле`
	}),
});

const changePasswordSchema = Joi.object({
	newPassword: Joi.string().min(5).max(30).required()
	.messages({
		'string.base': `Укажите валидный пароль`,
		'string.empty': `Поле "пароль" не может быть пустым`,
		'string.min': `Пароль должен содержать в себе минимум 5 символов`,
		'string.max': `Пароль не должен содержать в себе больше 30 символов`,
		'any.required': `"Пароль" обязательное поле`
	}),
	password: Joi.string().min(5).max(30).required()
	.messages({
		'string.base': `Укажите валидный пароль`,
		'string.empty': `Поле "пароль" не может быть пустым`,
		'string.min': `Пароль должен содержать в себе минимум 5 символов`,
		'string.max': `Пароль не должен содержать в себе больше 30 символов`,
		'any.required': `"Пароль" обязательное поле`
	}),
	user: Joi.object()
});

const registerSchema = Joi.object({
	email: Joi.string().email().required()
	.messages({
		'string.base': `Укажите валидную почту`,
		'string.empty': `Поле "Почта" не может быть пустым`,
		'string.min': ``,
		'any.required': `"email" обязательное поле`
	}),
	password: Joi.string().min(5).max(30).required()
	.messages({
		'string.base': `Укажите валидный пароль`,
		'string.empty': `Поле "пароль" не может быть пустым`,
		'string.min': `Пароль должен содержать в себе минимум 5 символов`,
		'string.max': `Пароль не должен содержать в себе больше 30 символов`,
		'any.required': `"Пароль" обязательное поле`
	}),
	nickname: Joi.string().min(2).max(16).regex(new RegExp("^[a-zA-Z0-9_]{2,16}$")).required()
	.messages({
		'string.base': `Укажите валидный пароль`,
		'string.empty': `Поле "Никнейм" не может быть пустым`,
		'string.min': `Никнейм должен содержать в себе минимум 2 символа`,
		'string.max': `Никнейм не должен содержать в себе больше 16 символов`,
		'string.pattern.base': `Ник може состоять только из латинских символов, цифр и _`,
		'any.required': `"Никнейм" обязательное поле`
	}),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required()
	.messages({
		"any.only" : "Пароли не совпадают"
	}),
	acceptTos: Joi.boolean().truthy("Yes").valid(true).required()
	.messages({
		"any.only" : "Поставьте галочку"
	}),
});

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);
exports.validateChangePassword = validator(changePasswordSchema);