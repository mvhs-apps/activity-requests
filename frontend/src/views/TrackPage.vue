<template>
	<div>
		<span style="font-weight: bold; font-size: 28px;">Track your request</span>
		<div class="input-area" style="margin-top: 50px;">
			<div class="text-input">
				<span class="input-title">Please enter the Request ID for your digital activity request</span>
				<input placeholder="Request ID" v-model="requestId">
			</div>
		</div>
		<button class="styled-button" @click="goToPage()">Track Request</button>
	</div>
</template>

<script>    
	export default {
		data() {
			return {
				requestId: ''
			}
		},
		methods: {
			goToPage() {
				this.$router.push({
					path: '/track/' + this.$data.requestId
				});
			}
		}
	}
</script>
