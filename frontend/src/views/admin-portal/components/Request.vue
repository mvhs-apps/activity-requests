<template>
    <div
        @click="$router.push({ path: '/form/' + form.id })"
        v-bind:class="'request ' + requestClass"
    >
        <div>
            <h2 style="font-weight: bold; font-size: 26px; display: inline;">{{ form.general.activity_name }}</h2>
            <span class="approved-symbol" v-if="form.meta.approved.admin">ADMIN APPROVED</span>
            <span class="approved-symbol" v-else>NOT ADMIN APPROVED</span>
        </div>
        <p>Submitted by: {{ form.general.student_name }}</p>
        <p v-if="form.general.event_on_campus === 'yes' && form.campus.location_on_campus != 'other'">
            Location: {{ form.campus.location_on_campus.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
        </p>
        <p>
            Activity starts on: {{ (new Date(form.general.start_date)).toLocaleDateString('en-US', {
                //weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'America/Los_Angeles',
            }) }}
        </p>
        <p>Organization name: {{ form.general.organization_name }}</p>
        <p>Submitted on: {{ (new Date(form.meta.date_submitted)).toLocaleDateString('en-US', {
                //weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'America/Los_Angeles',
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
            }) }}
        </p>
    </div>
</template>

<script>
export default {
    props: ['form'],
    computed: {
        requestClass() {
            return this.form.meta.approved.admin ? 'approved' : 'unapproved';
        }
    }
}
</script>

<style scoped>

.request {
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

.request:hover > div > h2 {
    text-decoration: underline;
}

.approved-symbol {
    float: right;
    font-weight: bold;
    font-size: 14px;
}

.approved {
    border-left: 6px solid green;
}

.unapproved {
    border-left: 6px solid red;
}

.approved:hover {
    background: rgba(0, 255, 0, .06);
}

.unapproved:hover {
    background: rgba(255, 0, 0, .04);
}

.approved > div > h2 {
    text-decoration-color: green !important;
}

.unapproved > div > h2 {
    text-decoration-color: red !important;
}

.approved > div > .approved-symbol {
    color: green;
}

.unapproved > div > .approved-symbol {
    color: red;
}
</style>
