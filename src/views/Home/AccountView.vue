<template>
	This is an Account page
	<h1 v-if="isLogged">
		<h4>{{user.id}}</h4>
		<h4>{{user.email}}</h4>
		<h4>{{user.username}}</h4>
	</h1>
	<h1 v-else>Oh no 😢</h1>
	<button @click="logout">logout</button>
</template>
<script>
	
	export default {
		name: 'AccountView',
		props: ['user', 'isLogged'],
		components: {},
		methods: {
			logout() {
				localStorage.removeItem("token");
				this.$router.push("/");
			}
		},
		mounted () {
			console.log(2);
		}
	}
</script>