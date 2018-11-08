<template>
    <div>
        <h1>Submit an Activity Request</h1>
        <br>
        <p>After you fill out this form, you will need to <span style="font-weight: bold; text-decoration: underline;">wait</span> for ASB approval before proceeding with the event — this form does not mean your activity is approved.</p>
        <br>
        <p>Fill out this form on a computer, if possible.</p>
        <br>
        <button @click="loadForm()" v-bind:style="{ width: buttonWidth, height: buttonHeight, opacity: buttonOpactiy }">I understand. Take me to the form</button>
    </div>
</template>

<script>
	export default {
		data() {
            return {
                buttonWidth: '0px',
                buttonHeight: '0px',
                buttonOpactiy: '0'
            }
        },
        methods: {
            loadForm() {
                this.$router.push({ path: '/form' });
            }
        },
        mounted() {
            setTimeout(() => {
                this.buttonOpactiy = '1';
                this.buttonWidth = '300px';
                this.buttonHeight = '60px';
            }, 5000);
        }
	}
</script>

<style scoped>
	h1 {
		font-weight: bold;
		font-size: 40px;
	}
    p {
        margin: 0;
        padding: 0;
    }
    button {
        width: 300px;
        height: 60px;
        font-size: 18px;
        border: 4px solid black;
        cursor: pointer;
        outline: none;
        transition: .5s ease all;
        background: white;
    }
    button:hover {
        background: #fccb0b;
        border-color: #fccb0b;
    }
</style>
