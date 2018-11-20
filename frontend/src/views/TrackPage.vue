<template>
	<div>
		<span style="font-weight: bold; font-size: 28px;">Track your request</span>
		<div class="input-area" style="margin-top: 10px;">
			<div class="text-input">
				<span class="input-title">Please enter the Request ID for your digital activity request</span><br>
				<span v-show="requestId.length !== 40" style="color: #6d6d6d;">All tracking ids are 40 digits long</span><br><br>
				<input placeholder="Request ID" style="width: 380px;" v-model="requestId" class="text-input-styled">
			</div>
		</div>
		<br>
		<button class="btn-styled" @click="goToPage()">Track Request</button>
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
					path: '/form/' + this.requestId
				});
			}
		}
	}
}
</script>

<style scoped src="@/assets/btn-styled.css"></style>
<style scoped src="@/assets/text-input-styled.css"></style>

