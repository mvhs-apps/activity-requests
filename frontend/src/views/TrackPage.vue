<template>
	<div>
		<span style="font-weight: bold; font-size: 28px;">Track your request</span>
		<div class="input-area" style="margin-top: 10px;">
			<div class="text-input">
				<span class="input-title">Please enter the Request ID for your digital activity request</span><br>
				<span v-show="requestId.length !== 40" style="color: #6d6d6d;">All tracking ids are 40 digits long</span><br><br>
				<input placeholder="Request ID" style="width: 380px;" v-model="requestId">
			</div>
		</div>
		<br>
		<button id="track-button" @click="goToPage()">Track Request</button>
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


<style scoped>
	.text-input input:focus {
		border-bottom: 2px solid #4285f4;
	}
	.text-input input {
        display: block;
        border: none;
        padding: 0 10px 5px 0;
        outline: none;
        border-radius: 0;
        transition: all .2s ease;
        border-bottom: 1px solid rgba(0,0,0,0.15);
        font-size: 16px;
        width: 300px;
    }

	#track-button {
		display: block;
		width: 150px;
		height: 40px;
		background: transparent;
		outline: none;
		border: 2px solid black;
		cursor: pointer;
		border-radius: 6px;
		font-size: 16px;
		font-family: 'Avenir';
		transition: .2s ease all;
	}

	#track-button:hover {
		background: #fccb0b;
		border-color: #fccb0b;
		box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
	}
</style>

