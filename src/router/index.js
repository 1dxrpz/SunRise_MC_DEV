import { createRouter, createWebHistory } from 'vue-router';

// Home views
import HomeView from '../views/Home/HomeView.vue';
import AccountView from '../views/Home/AccountView.vue';
import ShopView from '../views/Home/ShopView.vue';
import AboutView from '../views/Home/AboutView.vue';

// Auth views
import LoginView from '../views/Auth/LoginView.vue';
import RegisterView from '../views/Auth/RegisterView.vue';

// Layouts
import HomeLayout from '../layouts/HomeLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import AccountLayout from '../layouts/AccountLayout.vue';

const routes = [
{
	path: '/',
	name: 'home',
	component: HomeView,
	meta: {
		layout: HomeLayout
	}
},
{
	path: '/account',
	name: 'account',
	component: AccountView,
	meta: {
		layout: AccountLayout
	}
},
{
	path: '/shop',
	name: 'shop',
	component: ShopView,
	meta: {
		layout: HomeLayout
	}
},
{
	path: '/about',
	name: 'about',
	component: AboutView,
	meta: {
		layout: HomeLayout
	}
},
{
	path: '/register',
	name: 'register',
	component: RegisterView,
	meta: {
		layout: AuthLayout
	}
},
{
	path: '/login',
	name: 'login',
	component: LoginView,
	meta: {
		layout: AuthLayout
	}
},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
