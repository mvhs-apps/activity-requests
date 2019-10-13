<template>
	<div>
		<span style="font-weight: bold; font-size: 28px;">Track your request</span>
		<div class="input-area" style="margin-top: 10px;">
			<div class="text-input">
				<span class="input-title">Please enter the Request ID for your digital activity request</span><br>
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
			this.$router.push({
				path: '/request/' + this.requestId
			});
		}
	}
}
</script>

<style scoped src="@/assets/btn-styled.css"></style>
<style scoped src="@/assets/text-input-styled.css"></style>

