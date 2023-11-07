<template>
	<div class="content">
		<div class="container">
			<div class="products">
				<div class="product" v-for="(value, index) in transactions"  v-bind:key="index">
					<div class="sunbox"></div>
					<div class="infobox">
						<div class="product_name">{{value.name}}</div>
						<div class="product_description">{{value.description}}</div>
						<div class="product_price">{{value.price}}<span>₽</span></div>
						<button class="button">
							<i class="fa-solid fa-plus"></i>
						</button>
					</div>
					<div class="image">
						<img :src="value.image" />
					</div>
					<img class="bg_workbench" src="@/assets/images/workbench.png" />
					
			</div>
		</div>
	</div>
</div>
</template>

<script>
	const axios = require('axios');

	export default {
		name: 'ShopView',
		components: {},
		props: ['user', 'isLogged'],
		data() {
			return {
				transactions: []
			}
		},
		async created() {
			var result = await axios.get("http://localhost:3000/products");
			this.transactions = result.data;
		}
	}
</script>
<style lang="scss">
.products {
	margin-bottom: 50px;
}
.product {
	float: left;
	width: 300px;
	height: 400px;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	margin: 10px;

	.bg_workbench {
		position: absolute;
		z-index: 90;
		bottom: -50px;
		right: -100px;
		filter: grayscale(1);
		opacity: .025;
		transform: scale(.85);
	}
	.infobox {
		user-select: none;
		width: 100%;
		height: 50%;
		background: #1A1E25;
		position: absolute;
		bottom: 0;
		&:before {
			content: "";
			width: 50%;
			left: -10%;
			top: -30px;
			height: 100px;
			background: #eee;
			position: absolute;
			transform: rotate(6deg);
		}
		&:after {
			content: "";
			width: 200%;
			left: -50%;
			top: -20px;
			height: 100px;
			background: #1A1E25;
			position: absolute;
			transform: rotate(-8deg);
		}
		.product_name {
			color: #eee;
			position: absolute;
			z-index: 99;
			font-size: 18pt;
			left: 20px;
			bottom: 120px;
			font-weight: bold;
		}
		.product_description {
			color: #eee;
			position: absolute;
			z-index: 99;
			font-size: 10pt;
			left: 20px;
			bottom: 95px;
			opacity: .78;
		}
		.product_price {
			color: #eee;
			font-weight: bold;
			position: absolute;
			z-index: 99;
			font-size: 28pt;
			left: 20px;
			bottom: 15px;
			span {
				font-size: 20pt;
				margin-left: 10px;
			}
		}
		.button {
			position: absolute;
			right: 15px;
			bottom: 15px;
			width: 40px;
			height: 40px;
			padding: 0;
			z-index: 100;
			cursor: pointer;
			font-size: 18pt;
		}
	}
	&:nth-child(even) .infobox {
		&:before {
			transform: rotate(8deg);
		}
		&:after {
			transform: rotate(-6deg);
		}
	}
	.image {
		width: 240px;
		height: 240px;
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 92;
		
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			user-select: none;
		}
	}
}
</style>