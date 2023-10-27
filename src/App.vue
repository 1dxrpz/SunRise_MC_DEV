<template>
	<component :is="$route.meta.layout">
		<router-view />
	</component>
</template>
<script>
	export default {
		name: 'App',
		components: {}
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
}


@import '@/assets/styles/index.scss';

#app {
	font-family: Lato;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

</style>
