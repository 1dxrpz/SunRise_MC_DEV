<template>
	<li :v-for="item in form_errors" :key="item.message">
		{{ item.message }}
	</li>
</template>

<script>
	export default {
		name: 'ErrorViewer',
		props: {
			form_errors: Array
		}
	}
</script>

<style scoped lang="scss">
</style>
