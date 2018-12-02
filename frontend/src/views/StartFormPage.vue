<template>
    <div>
        <h1>Submit an Activity Request</h1>
        <br>
        <p>After you fill out this form, you will need to <span style="font-weight: bold; text-decoration: underline;">wait</span> for ASB and admin approval before proceeding with the event.</p>
        <br>
        <p>Fill out this form on a computer, if possible.</p>
        <br>
        <button @click="loadForm()" class="btn-styled" :style="{opacity: buttonOpacity}">I understand. Take me to the form</button>
    </div>
</template>

<script>
	export default {
		data() {
            return {
                buttonOpacity: '0'
            }
        },
        methods: {
            loadForm() {
                this.$router.push({ path: '/form' });
            }
        },
        mounted() {
            setTimeout(() => {
                this.buttonOpacity = '1';
            }, 5000);
        }
	}
</script>

<style scoped src="@/assets/btn-styled.css"></style>
<style scoped>
	h1 {
		font-weight: bold;
		font-size: 40px;
	}
    p {
        margin: 0;
        padding: 0;
    }
    .btn-styled {
        border-radius: 0;
        width: 300px;
        height: 60px;
    }
</style>
