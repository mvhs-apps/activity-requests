<template>
    <div>
        <span class="form-section-title">General Questions</span>
        <div style="padding: 0 100px;">
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title">Your Name</span>
                    <input type="text" placeholder="First and last" v-model="form.general.student_name">
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title">Activity Name</span>
                    <input type="text" placeholder="Type here" v-model="form.general.activity_name">
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title">Club Name</span>
                    <input type="text" v-model="form.general.club_name" placeholder="Type here">
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title">Your Email</span>
                    <input type="text" v-model="form.general.student_email" placeholder="MVLA email">
                    <span class="feedback" style="color: #d50000;">Please enter a valid MVLA email</span>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title">Club Advisor Email</span>
                    <input type="text" v-model="form.general.advisor_email" placeholder="MVLA email">
                    <span class="feedback" style="color: #d50000;">Please enter a valid MVLA email</span>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title" style="margin-bottom: 0;">Write a brief description of your event/fundraiser</span>
                    <span class="input-subtitle">Try to stay under 75 words</span>
                    <textarea @click="e => e.target.classList.add('expanded')" class="text-input" placeholder="Write here" v-model="form.general.event_description"></textarea>
                    <span class="feedback" style="display: block; color: rgb(95, 95, 95);">{{ form.general.event_description.trim().split(' ').length }} word(s)</span>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title" style="margin-bottom: 0;">Start date of event</span>
                    <span class="input-subtitle">This can be the day of the event or, if your event spans multiple days, the first day of the event</span>
                    <input type="date" v-model="form.general.start_date" placeholder="mm/dd/yyyy">
                    <span class="feedback" style="color: #d50000;">Please enter a valid MVLA email</span>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title" style="margin-bottom: 0;">Write all other dates (including times) of when your event will take place</span>
                    <span class="input-subtitle">Include the exact date, start time, and end time.</span>
                    <textarea @click="e => e.target.classList.add('expanded')" class="text-input" placeholder="Write here" v-model="form.general.all_dates"></textarea>
                </div>
            </div>
            <div class="input-area">
                <div class="select-input">
                    <span class="input-title">Is the event on campus?</span>
                    <div>
                        <p class="hoverable"><i class="material-icons">help</i></p>
                        <div>Will this event take place on MVHS campus?</div>
                    </div>
                    <select v-model="form.general.event_on_campus">
                        <option value="select_one" disabled>Select one</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>       
                </div>
            </div>
            <div class="input-area">
                <div class="select-input">
                    <span class="input-title">Is your event a fundraiser?</span>
                    <select v-model="form.general.is_fundraiser">
                        <option value="select_one" disabled>Select one</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
        </div>

        <div v-if="form.general.event_on_campus === 'yes'">
            <span class="form-section-title">Campus Questions</span>
        </div>

        <div v-if="form.general.is_fundraiser === 'yes'">
            <span class="form-section-title">Fundraiser Questions</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    general: {
                        student_name: '',
                        activity_name: '',
                        club_name: '',
                        event_description: '',
                        start_date: '',
                        all_dates: '',
                        event_on_campus: 'select_one',
                        is_fundraiser: 'select_one'
                    },
                    campus: {

                    },
                    fundraiser: {

                    }
                }
            }
        },
        mounted() {
            if (
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
                || navigator.userAgent.match(/Trident.*rv\:11\./)
                || window.navigator.userAgent.indexOf('MSIE ') > -1
            ) {
                this.$router.push({
                    path: '/bad-browser'
                });
            }
        }
    }
</script>

<style scoped>
    .form-section-title {
        font-size: 50px;
        font-weight: bold;
        display: inline-block;
        padding-bottom: 0;
        margin-bottom: 3px;
        background-image: linear-gradient(120deg, #fccb0b 0,#fccb0b 100%);
        background-repeat: no-repeat;
        background-size: 100% 8px;
        background-position: 0 84%;
    }

    .text-input textarea {
        border-radius: 0;
        border: none;
        display: block;
        border-bottom: 1px solid rgba(0,0,0,0.15);
        padding: 0 10px 5px 0;
        transition: all .2s ease;
        font-size: 16px;
        outline: none;
        width: 300px;
        height: 20px;
        resize: none;
        transition: all 0.4s ease;
    }

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

    .text-input input::placeholder, .text-input textarea::placeholder {
        color: #757575;
    }

    .text-input input:focus {
        border-bottom: 2px solid #4285f4;
    }

    .text-input .expanded {
        height: 200px;
        width: 500px;
        border: 1px solid rgb(76, 143, 255);
        border-radius: 4px;
        padding: 10px;
    }

    .text-input .expanded:focus {
        box-shadow: 3px 5px 4px 0px rgba(0,0,0,.11);
    }

    .hoverable {
        margin: 0 !important;
        font-size: 20px;
    }
    .hoverable + div {
        opacity: 0;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.17), 0 1px 3px 0 rgba(0,0,0,0.17);
        min-height: 0;
        min-width: 0;
        /*min-height: 100px;
        min-width: 300px;*/
        display: block;
        position: absolute;
        z-index: -5;
        padding: 10px;
        background: white;
        transition: opacity .2s ease;
        font-size: 14px;
    }
    .hoverable:hover + div {
        opacity: 1;
        z-index: 10;
    }
    @media only screen and (max-width: 350px) {
        .hoverable + div {
            width: 250px;
        }
    }
</style>
