<template>
    <div
        @click="$router.push({ path: '/form/' + form.id })"
        v-bind:style="{ borderLeft: '6px solid ' + (form.meta.approved.admin ? 'green' : 'red') }"
        class="request"
    >
        <div>
            <h2
                style="font-weight: bold; font-size: 26px; display: inline;"
                v-bind:style="{ textDecorationColor: form.meta.approved.admin ? 'green' : 'red'}"
            >{{ form.general.activity_name }}</h2>
            <span style="float: right; font-weight: bold; font-size: 14px; color: green;" v-if="form.meta.approved.admin">ADMIN APPROVED</span>
            <span style="float: right; font-weight: bold; font-size: 14px; color: red;" v-else>NOT ADMIN APPROVED</span>
        </div>
        <p>Submitted by: {{ form.general.student_name }}</p>
        <p v-if="form.general.event_on_campus === 'yes' && form.campus['location_on_campus'] != 'not_applicable'">
            Location: {{ form.campus['location_on_campus'] }}
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
        <p>Organization name: {{ form.general.club_name }}</p>
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
    props: ['form']
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
</style>
