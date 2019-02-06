import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
	id: 'UA-134054043-1'
});

new Vue({
	router,
	render: function (h) { return h(App) }
}).$mount('#app');
