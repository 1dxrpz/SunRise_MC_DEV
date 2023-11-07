<template>
	<div class="auth_body_container">
		<div class="auth_container">
			<div class="auth_wrapper">
				<div class="video_panel">
					<video autoplay="true" loop="true" class="auth_bg" muted="true">
						<source src="@/assets/videos/auth_bg.mp4">
					</video>
					<div class="dot_pattern"></div>
					<div class="info">
						<div class="primary">Играй с нами</div>
						<div class="secondary">ЗДЕСЬ<br>КАК МИНИМУМ<br>ПРИКОЛЬНО</div>
					</div>
				</div>
				<div class="form_panel">
					<router-link to="/">
						<i class="fa-solid fa-xmark back_button"></i>
					</router-link>

					<img class="logo" src="@/assets/images/logo.png">
					<router-view v-if="isMounted" :user="user" :isLogged="isLogged" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import '@/assets/styles/auth_layout.scss';
	.back_button {
		position: absolute;
		right: 20px;
		top: -30px;
		color: #333;
		font-size: 18pt;
	}
</style>

<script>
	import axios from 'axios';
	export default {
		name: 'AboutView',
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

