<template>
	<div class="content">
		<div class="main_bg">
			<div class="container">
				<iframe src="https://discord.com/widget?id=573447445384790016&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'HomeView',
		components: {},
		props: ['user', 'isLogged']
	}
</script>

<style lang="scss">
.main_bg {
	width: 100vw;
	background: #1a106a;
	position: relative;
	padding-top: 80px;
}
</style>