import Vue from 'vue'
import { page } from 'vue-analytics';
import Router from 'vue-router'

import HomePage from './views/HomePage.vue'
import TrackPage from './views/TrackPage.vue';
import StartForm from './views/StartFormPage.vue';
import FormPage from './views/FormPage.vue';
import ViewRequestPage from './views/ViewRequestPage.vue';
import BadBrowserPage from './views/BadBrowserPage.vue';
import FormSubmittedPage from './views/FormSubmittedPage.vue';
import FormErrorPage from './views/FormErrorPage.vue';
import LoginPage from './views/admin-portal/LoginPage.vue';
import AllRequestsPage from './views/admin-portal/AllRequestsPage.vue';
import PasswordsPage from './views/admin-portal/PasswordsPage.vue';
import NotFoundPage from './views/NotFoundPage.vue';
import HelpPage from './views/HelpPage.vue';

Vue.use(Router)

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/start-form',
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
			path: '/form-error/:error',
			name: 'form-error',
			component: FormErrorPage,
			meta: {
				title: 'Form Error - Activity Requests'
			}
		},
		{
			path: '/track',
			name: 'track',
			component: TrackPage,
			meta: {
				title: 'Track Request - Activity Requests'
			}
		},
		{
			path: '/request/:id',
			name: 'view-request',
			component: ViewRequestPage
		},
		{
			path: '/admin',
			redirect: '/admin/login'
		},
		{
			path: '/admin/login',
			name: 'admin-login',
			component: LoginPage,
			meta: {
				title: 'Admin Login - Activity Requests'
			}
		},
		{
			path: '/admin/all-requests',
			name: 'admin-all-requests',
			component: AllRequestsPage,
			meta: {
				title: 'All Requests - Activity Requests'
			}
		},
		{
			path: '/admin/passwords',
			name: 'admin-passwords',
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

	// google analytics
	page(to.path);

	next();
});

export default router;
