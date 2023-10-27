<template>
	<div class="auth_body_container">
		<div class="auth_container">
			<div class="auth_wrapper">
				<div class="video_panel">
					<video autoplay loop class="auth_bg" muted="">
						<source src="@/assets/videos/auth_bg.mp4">
					</video>
					<div class="dot_pattern"></div>
					<div class="info">
						<div class="primary">Играй с нами</div>
						<div class="secondary">ЗДЕСЬ<br>КАК МИНИМУМ<br>ПРИКОЛЬНО</div>
					</div>
				</div>
				<div class="form_panel">
					<img class="logo" src="@/assets/images/logo.png">
					<router-view v-if="isMounted" :user="user" :isLogged="isLogged" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import '@/assets/styles/auth_layout.scss';
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

