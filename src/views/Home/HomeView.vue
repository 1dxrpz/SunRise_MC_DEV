<template>
	<div class="content">
		<div class="main_bg">
			<div class="dot_pattern"></div>
			<div class="container">

				<div class="topic_content">
					
					<div class="topic_text">
						<h1>✨ Hello, world!</h1>
						<p>Lorem ipsum, dolor sit amet, consectatur sic semper evello<br> mortem tyrannis</p>
						<button class="button huge">Играть</button>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="discord_info">
				<iframe src="https://discord.com/widget?id=573447445384790016&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
				<div class="discord_text">
					<h1>Join Community</h1>
					<p>Lorem ipsum, dolor sit amet, consectatur sic semper evello<br> mortem tyrannis</p>
					<a class="button blue" href="https://discord.gg/sun-grass-573447445384790016">Join discord</a>
				</div>
			</div>
		</div>
		<div class="secondary_bg">
			<div class="container">
				
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
@import '@/assets/styles/home.scss';
.discord_info {
	display: flex;
	.discord_text {
		color: #eee;
		padding-left: 100px;
		h1 {
			font-size: 48pt;
			font-weight: bold;
		}
		p {
			font-size: 22pt;
			padding-bottom: 20px;
		}
	}
}
</style>