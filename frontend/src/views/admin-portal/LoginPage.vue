<template>
    <div>
        <h1>Please enter any department password</h1>
        <br>
        <input type="password" placeholder="Type here" v-model="password" class="text-input-styled">
        <br>
        <span v-show="badPassword" style="padding: 12px 0 0 4px; display: block; font-weight: bold; color: red; font-size: 16px;">Your password is incorrect</span>
        <br>
		<button class="btn-styled" @click="login()">Login</button>
        <br>
    </div>
</template>

<script>
import {serverHost} from '@/constants';
import { put, get } from '@/utils.js';

export default {
    data() {
        return {
            badPassword: false,
            password: ''
        }
    },
    methods: {
        login() {
            window.fetch(`${serverHost}/api/check-password`, {
                method: 'POST',
                body: JSON.stringify({ password: this.password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        put('password', this.password);
                        this.$router.push({
                            path: this.$route.query.continue || '/admin/all-requests'
                        });
                    } else {
                        this.badPassword = true;
                    }
                });
        }
    },
    created() {
        if (get('password')) {
            this.$router.push({ path: '/admin/all-requests' });
        }
    }
}
</script>

<style scoped src="@/assets/text-input-styled.css"></style>
<style scoped src="@/assets/btn-styled.css"></style>
