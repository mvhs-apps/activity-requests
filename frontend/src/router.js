import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './views/HomePage.vue'
import TrackPage from './views/TrackPage.vue';
import StartForm from './views/StartFormPage.vue';
import FormPage from './views/FormPage.vue';
import ViewFormPage from './views/ViewFormPage.vue';
import BadBrowserPage from './views/BadBrowserPage.vue';
import FormSubmittedPage from './views/FormSubmittedPage.vue';
import LoginPage from './views/asb/LoginPage.vue';
import AllRequestsPage from './views/asb/AllRequestsPage.vue';
import PasswordsPage from './views/asb/PasswordsPage.vue';
import NotFoundPage from './views/NotFoundPage.vue';
import HelpPage from './views/HelpPage.vue';

Vue.use(Router)

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
			meta: {
				title: 'Home - Activity Requests'
			}
		},
		{
			path: '/start-form',
			name: 'start-form',
			component: StartForm,
			meta: {
				title: 'Form - Activity Requests'
			}
		},
		{
			path: '/help',
			name: 'help',
			component: HelpPage,
			meta: {
				title: 'Help - Activity Requests'
			}
		},
		{
			path: '/form',
			name: 'form',
			component: FormPage,
			meta: {
				title: 'Form - Activity Requests'
			}
		},
		{
			path: '/form-submitted/:id',
			name: 'form-submitted',
			component: FormSubmittedPage,
			meta: {
				title: 'Form Submitted - Activity Requests'
			}
		},
		{
			path: '/track',
			name: 'track',
			component: TrackPage,
			meta: {
				title: 'Track Form - Activity Requests'
			}
		},
		{
			path: '/form/:id',
			name: 'view-form',
			component: ViewFormPage
		},
		{
			path: '/asb',
			redirect: '/asb/login'
		},
		{
			path: '/asb/login',
			name: 'asb-login',
			component: LoginPage,
			meta: {
				title: 'ASB Login - Activity Requests'
			}
		},
		{
			path: '/asb/all-requests',
			name: 'asb-all-requests',
			component: AllRequestsPage,
			meta: {
				title: 'All Requests - Activity Requests'
			}
		},
		{
			path: '/asb/passwords',
			name: 'asb-passwords',
			component: PasswordsPage,
			meta: {
				title: 'Passwords - Activity Requests'
			}
		},
		{
			path: '/bad-browser',
			name: 'bad-browser',
			component: BadBrowserPage,
			meta: {
				title: 'Bad Browser - Activity Requests'
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFoundPage,
			meta: {
				title: 'Not Found - Activity Requests'
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.meta.title) window.document.title = to.meta.title;
	next();
});

export default router;
