<template>
	<div v-if="isLogged">
		<h1>{{user.isVerified}}</h1>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		name: 'VerifyView',
		props: ['user', 'isLogged'],
		components: {},
		async mounted () {
			if (!this.isLogged) {
				this.$router.push("/login");
			} else {
				if (this.user.isVerified == 0 && this.$route.query.token != undefined) {
					await axios.get("verify?token=" + localStorage.getItem("token"));
					localStorage.removeItem("token");
					location.reload();
				} else {
					this.$router.push("/account");
				}
			}
		}
	}
</script>