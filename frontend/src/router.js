import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './views/HomePage.vue'
import AboutPage from './views/AboutPage.vue';
import TrackPage from './views/TrackPage.vue';
import ViewFormPage from './views/ViewFormPage.vue';

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/about',
			name: 'about',
			component: AboutPage
		},
		{
			path: '/track',
			name: 'track',
			component: TrackPage
		},
		{
			path: '/track/:id',
			name: 'view-form',
			component: ViewFormPage
		}
	]
})
