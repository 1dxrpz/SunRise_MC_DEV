<template>
	<div class="content about">
		<div class="editor">
			<textarea v-model="userinput">

			</textarea>
		</div>
		<article class="markdown-body" v-html="text">
			
		</article>
	</div>
</template>
<style lang="scss">
@import "@/assets/styles/github-markdown.css";
body {
		background: #22272e !important;
	}
.about {
	font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";

	.wiki {
		color: #eee;
		background: #1b1b1b;
		padding: 20px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, .3);
		font-family: Montserrat, sans-serif;
	}
	.markdown-body, .editor {
		min-width: 200px;
		max-width: 790px;
		margin: 0 auto;
		padding: 30px;
		position: relative;
		
		textarea {
			width: 100%;
			resize: vertical;
		}
		margin-bottom: 20px;
	}
	.markdown-body {
	}
}

</style>
<script>
	
	var markdown = require("marked");
	export default {
		name: 'AboutView',
		components: {},
		props: ['user', 'isLogged'],
		data() {
			return {
				userinput: "",
				text: ""
			}
		},
		watch: {
			userinput: function (val) {
				this.text = markdown.parse(val);
			}
		}
	}
</script>