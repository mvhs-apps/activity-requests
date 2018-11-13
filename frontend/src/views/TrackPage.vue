<template>
	<div>
		<span style="font-weight: bold; font-size: 28px;">Track your request</span>
		<div class="input-area" style="margin-top: 10px;">
			<div class="text-input">
				<span class="input-title">Please enter the Request ID for your digital activity request</span><br>
				<span v-show="requestId.length !== 40" style="color: #6d6d6d;">All tracking ids are 40 digits long</span><br><br>
				<input placeholder="Request ID" style="width: 360px;" v-model="requestId">
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
				if (this.requestId.length === 40) {
					this.$router.push({
						path: '/track/' + this.requestId
					});
				}
			}
		}
	}
</script>
