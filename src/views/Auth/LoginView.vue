<template>
	<form @submit.prevent="login">
		<div class="form_control">
			<div class="label">Логин (Email)</div>
			<input class="text" v-model="email" type="email" required="true">
		</div>
		<div class="form_control">
			<div class="label">Пароль</div>
			<input class="text" v-model="password" type="password" required="true">
		</div>
		<button type="confirm" class="confirm_button">Войти</button>
		<div class="additional">Нет акаунта? <router-link to="/register">Зарегистрироваться</router-link></div>
		<div class="additional"><router-link to="/login">Забыли пароль?</router-link></div>
	</form>
	<div class="errors">
		<li v-for="(value, index) in form_errors"  v-bind:key="index">
			{{value.message}} 
		</li>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		props: ['user', 'isLogged'],
		data: () => {
			return {
				form_errors: [],
				email: "",
				password: ""
			}
		},
		methods: {
			async login(e) {
				e.preventDefault();
				var result = await axios.post("login", {
					email: this.email,
					password: this.password
				});
				if (Array.isArray(result.data)) {
					this.form_errors = result.data;
				} else {
					if (result.data.message == undefined) {
						localStorage.setItem('token', result.data.token);
						this.$router.push("/account");
					} else {
						this.form_errors = "error";
					}
				}
			},
		},
		name: 'LoginView',
		components: {},
		metaInfo: {
			title: "Login"
		},
		created() {
			if (this.isLogged) {
				this.$router.push("/account");
			}
		}
	}
</script>