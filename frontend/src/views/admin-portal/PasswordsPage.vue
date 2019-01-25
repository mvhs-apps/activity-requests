<template>
    <div>
        <h1>Update passwords</h1>
        <p>Current passwords are not displayed here. If you would like to view a current password, contact one of the student developers.</p>
        <span style="display: block; color: green; font-weight: bold; font-size: 22px;" v-show="success"><br>Password changed successfully!</span>
        <span style="display: block; color: red; font-weight: bold; font-size: 22px;" v-show="badPassword"><br>Your current Admin password is incorrect</span>
        <span style="display: block; color: red; font-weight: bold; font-size: 22px;" v-show="serverDown"><br>Server is having issues writing data :( Please report this and try again later.</span>
        <br><br>
        <input type="password" class="text-input-styled" v-model="currentAdminPassword" placeholder="Current Admin password">
        <br><br>
        <h4>Select the password to change</h4>
        <select class="select-input" v-model="selectInput">
            <option value="select_one" disabled>Select one</option>
            <option value="admin">Admin Password</option>
            <option value="asb">ASB Password</option>
            <option value="library">Library</option>
            <option value="ccc">College and Career Center</option>
            <option value="gym">Athletics/PE department (gym)</option>
            <option value="theater">Theater</option>
            <option value="cafeteria">Food Service Department (cafeteria)</option>
        </select>
        <br><br>
        <input type="password" class="text-input-styled" v-model="newPassword" placeholder="New password here">
        <br><br>
        <input type="password" class="text-input-styled" v-model="newPasswordRetype" placeholder="Retype new password here">
        <br><br>
        <span v-show="newPassword !== newPasswordRetype" style="font-weight: bold; color: red; font-size: 16px;">Passwords don't match<br><br></span>
        <button v-show="newPassword === newPasswordRetype && selectInput !== 'select_one' && newPassword && currentAdminPassword" class="btn-styled" @click="updatePassword()">Update password</button>
    </div>
</template>

<script>
import { serverHost } from '@/constants.js';
import { get } from '@/utils';

export default {
    data() {
        return {
            newPassword: '',
            newPasswordRetype: '',
            currentAdminPassword: '',
            selectInput: 'select_one',
            success: false,
            badPassword: false,
            serverDown: false
        }
    },
    methods: {
        updatePassword() {
            window.fetch(`${serverHost}/api/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dept: this.selectInput,
                    authPassword: this.currentAdminPassword,
                    newPassword: this.newPassword
                })
            }).then(res => res.json()).then(res => {

                this.success = false;
                this.badPassword = false;
                this.serverDown = false;

                if (res.success) {
                    this.success = true;
                } else {
                    if (res.error === 'bad_password') {
                        this.badPassword = true;
                    } else if (res.error === 'error_writing_data') {
                        this.serverDown = true;
                    }
                }
            });

            this.newPassword = '';
            this.newPasswordRetype = '';
            this.currentAdminPassword = '';
            this.selectInput = 'select_one';
        }
    },
    beforeCreate() {
        if (!get('password')) {
            this.$router.push({ path: '/admin/login?continue=%2Fadmin%2Fpasswords' });
        }
    }
}
</script>


<style scoped src="@/assets/text-input-styled.css"></style>
<style scoped src="@/assets/btn-styled.css"></style>
<style scoped>
    .text-input > div, .select-input > div {
		display: inline-block;
	}

	.select-input select, select {
		display: block;
		border: 2px solid #3367d6;
		background: #fff;
		color: #000;
		border-radius: 0;
		padding: 2px 15px 2px 10px;
		cursor: pointer;
		margin: 0;
		width: 250px;
		height: 30px;
		font-size: 16px;
		outline: none;
	}
</style>
