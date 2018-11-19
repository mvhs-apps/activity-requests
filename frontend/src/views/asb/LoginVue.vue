<template>
    <div>
        <h1>Please enter the ASB password</h1>
        <br>
        <input type="text" placeholder="Type here" v-model="password" class="text-input-styled">
        <br>
        <span v-show="badPassword" style="padding: 12px 0 0 4px; display: block; font-weight: bold; color: red; font-size: 16px;">Your password is incorrect</span>
        <br>
		<button class="btn-styled" @click="login()">Login</button>
        <br>
    </div>
</template>

<script>
    import {serverHost} from '@/constants';
    import { isValidCookie } from '@/utils.js';

    export default {
        data() {
            return {
                badPassword: false,
                password: ''
            }
        },
        methods: {
            login() {
                window.fetch(`${serverHost}/api/check-asb-password`, {
                    method: 'POST',
                    body: JSON.stringify({ password: this.password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success) {
                            localStorage.cookie = JSON.stringify({
                                password: this.password,
                                expires: Date.now() + (15 * 60 * 1000)
                            });
                            this.badPassword = false;
                            this.$router.push({ path: '/asb/all-requests' });
                        } else {
                            this.badPassword = true;
                        }
                    });
            }
        },
        created() {
            if (isValidCookie()) {
                this.$router.push({ path: '/asb/all-requests' });
            }
        }
    }
</script>

<style scoped src="@/assets/text-input-styled.css"></style>
<style scoped src="@/assets/btn-styled.css"></style>
