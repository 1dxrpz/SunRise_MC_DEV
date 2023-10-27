<template>
	<router-view v-if="isMounted" :user="user" :isLogged="isLogged" />
</template>

<style lang="scss">
</style>
<style lang="scss">
	@import '@/assets/styles/account_layout.scss';
</style>
<script>
	import axios from 'axios';
	export default {
		name: 'AccountLayout',
		components: {},
		data() {
			return {
				user: null,
				isLogged: false,
				isMounted: false
			}
		},
		async mounted () {

			this.isLogged = localStorage.getItem("token") != null;
			const response = await axios.get("user");
			this.user = response.data;
			console.log(1);
			this.isMounted = true;
		},
	}
</script>