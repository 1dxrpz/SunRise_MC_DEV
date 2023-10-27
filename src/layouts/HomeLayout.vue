<template>
	<div class="container">
		<nav>
			<div class="nav-left">
				<router-link to="/">
					<img id="logo" alt="logo" src="@/assets/images/logo.png">
				</router-link>
				<router-link to="/">
					<div class="nav-link">Home</div>
				</router-link>
				<router-link to="/shop">
					<div class="nav-link">Shop</div>
				</router-link>
				<router-link to="/about">
					<div class="nav-link">About</div>
				</router-link>
			</div>
			<div class="nav-right">
				<router-link to="/launcher">
					<div class="nav-link">Launcher</div>
				</router-link>
				<router-link v-if="isLogged" to="/account">
					<div class="nav-link">Account</div>
				</router-link>
				<div v-else>
					<router-link  to="/register">
						<div class="nav-link">Register</div>
					</router-link>
					<router-link  to="/login">
						<div class="nav-link">Login</div>
					</router-link>
				</div>
			</div>
			
		</nav>
	</div>
	<router-view v-if="isMounted" :user="user" :isLogged="isLogged"/>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'HomeView',
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
		}
	}
</script>

<style lang="scss">

@font-face {
	font-family: minecraft;
	src: url(@/assets/fonts/minecraft.ttf);
}
@font-face {
	font-family: Lato;
	src: url(@/assets/fonts/Lato-Regular.ttf);
	font-weight: 600;
}
@font-face {
	font-family: Lato;
	font-weight: 700;
	src: url(@/assets/fonts/Lato-SemiBold.ttf);
}
@font-face {
	font-family: Lato;
	font-weight: 800;
	src: url(@/assets/fonts/Lato-Bold.ttf);
}


@import '@/assets/styles/index.scss';

#app {
	font-family: Lato;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

</style>
