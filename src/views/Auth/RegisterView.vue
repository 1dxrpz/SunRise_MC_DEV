<template>
	<form @submit.prevent="register">
		<div class="form_control">
			<div class="label">Логин (Email)</div>
			<input class="text" v-model="email" type="email" required="true" />
		</div>
		<div class="form_control">
			<div class="label">Никнейм</div>
			<input class="text" v-model="nickname" required="true" />
		</div>
		<div class="form_control">
			<div class="label">Пароль</div>
			<input class="text" v-model="password" type="password" required="true" />
		</div>
		<div class="form_control">
			<div class="label">Повторите пароль</div>
			<input class="text" v-model="confirmPassword" type="password" required="true" />
		</div>
		
		<div class="form_control">
			<div class="label">Согласен на обработку персональных данных</div>
			<input v-model="acceptTos" type="checkbox" />
		</div>
		<button type="confirm" class="confirm_button">Зарегистрироваться</button>
		<div class="additional">Зарегистрированы? <router-link to="/login">Войти</router-link></div>
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
				acceptTos: false,
				confirmPassword: "",
				nickname: "",
				password: ""
			}
		},
		methods: {
			async register(e) {
				e.preventDefault();
				var result = await axios.post("register", {
					email: this.email,
					nickname: this.nickname,
					password: this.password,
					acceptTos: this.acceptTos,
					confirmPassword: this.confirmPassword
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
		name: 'RegisterView',
		components: {},
		metaInfo: {
			title: "Register"
		},
		created() {
			if (this.isLogged) {
				this.$router.push("/account");
			}
			console.log(2);
		}
	}
</script>