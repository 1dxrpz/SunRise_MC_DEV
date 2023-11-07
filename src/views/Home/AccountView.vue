<template>
	<div class="content">
		<div class="container">
			<div v-if="isLogged">
				<h1>{{user.isVerified}}</h1>
				<button @click="logout">logout</button>
				<div v-if="user.isVerified === 1">
					<h4>{{user.id}}</h4>
					<h4>{{user.email}}</h4>
					<h4>{{user.username}}</h4>

					<form @submit.prevent="changePassword">
						<div class="form_control">
							<div class="label">Пароль</div>
							<input class="text" v-model="password" type="password" required="true">
						</div>
						<div class="form_control">
							<div class="label">Новый пароль</div>
							<input class="text" v-model="newPassword" type="password" required="true">
						</div>

						<button type="confirm" class="confirm_button">Изменить пароль</button>
					</form>
					<div class="errors">
						<li v-for="(value, index) in form_errors"  v-bind:key="index">
							{{value.message}} 
						</li>
					</div>
				</div>
				<div v-else>
					<div v-if="user.email">has email</div>
					<div v-else>
						<input  />
					</div>
					<h1>Подтвердите почту</h1>
					<button @click="sendVerifyMessage">Подтвердить почту</button>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
	import axios from 'axios';
	export default {
		name: 'AccountView',
		props: ['user', 'isLogged'],
		components: {},
		data () {
			return {
				form_errors: [],
				password: null,
				newPassword: null
			}
		},
		methods: {
			async sendVerifyMessage() {
				console.log(this.user.email.trim().length === 0);
				//await axios.get("getverify");
			},
			async changePassword(e) {
				e.preventDefault();
				var result = await axios.post("changePassword", {
					password: this.password,
					newPassword: this.newPassword,
					user: this.user
				});
				
				if (Array.isArray(result.data)) {
					this.form_errors = result.data;
				} else {
					if (result.data.message == undefined) {
						localStorage.removeItem('token');
						location.reload();
						this.$router.push("/login");
					} else {
						this.form_errors = "error";
					}
				}
				
			},
			logout() {
				localStorage.removeItem("token");
				this.$router.push("/");
				location.reload();
			}
		},
		mounted () {
			if (!this.isLogged) {
				this.$router.push("/login");
			}
		}
	}
</script>