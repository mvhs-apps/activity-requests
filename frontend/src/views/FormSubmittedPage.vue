<template>
    <div>
        <h1>Your request was submitted!</h1>
        <br>
        <h3>Remember: it is your repsonsiblity to contact the necessary parties/departments and ask them to approve your activity request</h3>
        <br>
        <p>You can expect an email sent to you with necessary information.</p>
        <br>
        <p>The ID of your request is:</p>
        <br>
        <span style="display:inline; background: #ddd; padding: 6px 10px; border-radius: 4px;">{{ this.$route.params.id }}</span>
        <br>
        <br>
        <p>Keep this ID safe! If you lose this ID, you will have to restart</p>
    </div>
</template>


<style scoped>
    h1 {
		font-weight: bold;
		font-size: 40px;
	}
    p {
        margin: 0;
        padding: 0;
    }
</style>
