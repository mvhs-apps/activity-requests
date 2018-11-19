<template>
    <div>
        <h1>All Requests</h1>
        <div>
            <div
                v-for="form of formsToDisplay"
                v-bind:key="form.id"
                class="each"
                @click="$router.push({ path: '/track/' + form.id })"
                v-bind:style="{ borderLeft: '6px solid ' + (form.meta.approved.asb ? 'green' : 'red') }"
            >   
                <div>
                    <h2 style="font-weight: bold; font-size: 26px; display: inline;">{{ form.general.activity_name }}</h2>
                    <span style="float: right; font-weight: bold; font-size: 14px; color: green;" v-if="form.meta.approved.asb">ASB APPROVED</span>
                    <span style="float: right; font-weight: bold; font-size: 14px; color: red;" v-else>NOT ASB APPROVED</span>
                </div>
                <p>Submitted by: {{ form.general.student_name }}</p>
                <p>Club name: {{ form.general.club_name }}</p>
                <p>Submitted on: {{ (new Date(form.meta.date_submitted)).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'America/Los_Angeles',
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric',
                    }) }}
                </p>

            </div>
        </div>

    </div>
</template>

<script>
import { isValidCookie } from '@/utils.js';
import { serverHost } from '@/constants.js';

export default {
    data() {
        return {
            allForms: {},
            formsToDisplay: []
        }
    },
    methods: {
        loadByDateSubmitted() {
            let forms = JSON.parse(JSON.stringify(this.allForms));
            forms.sort((a, b) => a.meta.date_submitted > b.meta.date_submitted);
            
            this.formsToDisplay = forms;
        }
    },
    beforeCreate() {
        if (!isValidCookie()) {
            this.$router.push({ path: '/asb/login' });
        }
    },
    mounted() {
        window.fetch(`${serverHost}/api/get-all-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authPassword: JSON.parse(localStorage.cookie).password })
        })
            .then(res => res.json())
            .then(res => {
                let forms = [];

                for (let form in res.data) {
                    if (res.data.hasOwnProperty(form)) {
                        res.data[form].id = form;
                        forms.push(res.data[form]);
                    }
                }
                this.allForms = forms;

                this.loadByDateSubmitted();
            });
    }
}
</script>

<style scoped>
    .each {
        max-width: 750px;
		margin-top: 10px;
		margin-left: 16px;
		padding: 18px;
        border-radius: 8px;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        transition: box-shadow .2s ease;
        cursor: pointer;
        transition: .2s ease all;
        background: white;
        margin: 20px 0;
    }

    .each:hover > div > h2 {
        text-decoration: underline #fccb0b;
    }

    a {
        cursor: pointer;
        color: #1a73e8;
    }
</style>
