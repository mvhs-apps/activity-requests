<template>
    <div>
        <span class="form-section-title">General Questions</span>
        <div class="input-group">
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
                    <input type="text" v-model.trim="form.general.student_email" placeholder="MVLA email">
                    <span class="feedback" style="color: #d50000;">Please enter a valid MVLA email</span>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title">Club Advisor Email</span>
                    <input type="text" v-model.trim="form.general.advisor_email" placeholder="MVLA email">
                    <span class="feedback" style="color: #d50000;">Please enter a valid MVLA email</span>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title" style="margin-bottom: 0;">Write a brief description of your event/fundraiser</span>
                    <span class="input-subtitle">Try to stay under 75 words</span>
                    <textarea @focus="e => e.target.classList.add('expanded')" class="text-input" placeholder="Write here" v-model="form.general.event_description"></textarea>
                    <span class="feedback" style="display: block; color: rgb(95, 95, 95);">{{ form.general.event_description.trim().split(' ').length }} word(s)</span>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title" style="margin-bottom: 0;">Start date of event</span>
                    <span class="input-subtitle">This can be the day of the event or, if your event spans multiple days, the first day of the event</span>
                    <input type="date" v-model.trim="form.general.start_date" placeholder="mm/dd/yyyy">
                    <span class="feedback" style="color: #d50000;">Please enter a valid MVLA email</span>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title" style="margin-bottom: 0;">Write all other dates (including times) of when your event will take place</span>
                    <span class="input-subtitle">Include the exact date, start time, and end time.</span>
                    <textarea @focus="e => e.target.classList.add('expanded')" class="text-input" placeholder="Write here" v-model="form.general.all_dates"></textarea>
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

        <span v-show="form.general.event_on_campus === 'yes'" class="form-section-title">Campus Questions</span>
        <div v-show="form.general.event_on_campus === 'yes'" class="input-group">
            <div class="checkbox-input">
                <span class="input-title">Please select desired facilities</span>
                <div class="md-checkbox">
                    <input type="checkbox" v-model="form.campus.gym" id="gym-checkbox">
                    <label for="gym-checkbox">Gym/fields</label>
                </div>
                <div class="md-checkbox">
                    <input type="checkbox" v-model="form.campus.ccc" id="ccc-checkbox">
                    <label for="ccc-checkbox">College and Career Center</label>
                </div>
                <div class="md-checkbox">
                    <input type="checkbox" v-model="form.campus.cafeteria" id="cafeteria-checkbox">
                    <label for="cafeteria-checkbox">Cafeteria</label>
                </div>
                <div class="md-checkbox">
                    <input type="checkbox" v-model="form.campus.library" id="library-checkbox">
                    <label for="library-checkbox">Library</label>
                </div>
                <div class="md-checkbox">
                    <input type="checkbox" v-model="form.campus.classroom" id="classroom-checkbox">
                    <label for="classroom-checkbox">Classroom</label>
                </div>
                <div class="input-area checkbox-extension" v-show="form.campus.classroom">
                    <div class="text-input">
                        <span class="input-title">Which classrooms?</span>
                        <div>
                            <p class="hoverable"><i class="material-icons">help</i></p>
                            <div>Enter specific details including, but not limited to, room numbers and times.</div>
                        </div>
                        <textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.campus['classroom-extra-info']" placeholder="Write here"></textarea>
                    </div>
                </div>
                <div class="md-checkbox">
                    <input type="checkbox" v-model="form.campus.theater" id="theater-checkbox">
                    <label for="theater-checkbox">Theater</label>
                </div>
                <div class="input-area checkbox-extension" v-show="form.campus.theater">
                    <div class="text-input">
                        <span class="input-title" style="margin-bottom: 0;">Please fill out this form for theater use</span>
                        <span class="input-subtitle">Passoword is 'spartans'</span>
                        <br>
                        <a href="https://www.spartantheatermvhs.com/bookingmvla/" target="_blank">https://www.spartantheatermvhs.com/bookingmvla/</a>
                    </div>
                </div>
            </div>
            <div class="input-area">
                <div class="select-input">
                    <span class="input-title" style="font-size: 22px;">Which part of campus most accurately describes the location of your event?</span>
                    <div>
                        <p class="hoverable"><i class="material-icons">help</i></p>
                        <div>If your location is not listed, please select the closet available option.</div>
                    </div>
                    <select v-model="form.campus.location_on_campus">
                        <option value="select_one" disabled>Select one</option>
                        <option value="tennis_court_1">Tennis Court #1</option>
                        <option value="tennis_court_2">Tennis Court #2</option>
                        <option value="tennis_court_3">Tennis Court #3</option>
                        <option value="tennis_court_4">Tennis Court #4</option>
                        <option value="tennis_court_5">Tennis Court #5</option>
                        <option value="tennis_court_6">Tennis Court #6</option>
                        <option value="tennis_court_7">Tennis Court #7</option>
                        <option value="tennis_court_8">Tennis Court #8</option>
                        <option value="main_quad_1">Main Quad #1</option>
                        <option value="main_quad_2">Main Quad #2</option>
                        <option value="main_quad_3">Main Quad #3</option>
                        <option value="main_quad_4">Main Quad #4</option>
                        <option value="main_quad_5">Main Quad #5</option>
                        <option value="quad_redwood_grove">Quad Redwood Grove</option>
                        <option value="quad_theater_area">Quad Theater Area</option>
                        <option value="science_quad">Science Quad</option>
                        <option value="soccer_field_1">Soccer Field #1</option>
                        <option value="soccer_field_2">Soccer Field #2</option>
                        <option value="multi_use_field">Multi-Use Field</option>
                        <option value="100_wing">100 Wing</option>
                        <option value="200_wing">200 Wing</option>
                        <option value="300_wing">300 Wing</option>
                        <option value="400_wing">400 Wing</option>
                        <option value="500_wing">500 Wing</option>
                        <option value="600_wing">600 Wing</option>
                    </select>
                </div>
            </div>
            <div class="input-area">
                <div class="checkbox-input">
                    <span class="input-title">Please select desired equipment</span>
                    <div class="md-checkbox">
                        <input type="checkbox" v-model="form.campus.screens" id="screens-checkbox">
                        <label for="screens-checkbox">Screens/projector</label>
                    </div>
                    <div class="input-area checkbox-extension" v-show="form.campus.screens">
                        <div class="text-input">
                            <span class="input-title" style="margin-bottom: 0;">Quantity of projector(s)/screen(s)</span>
                            <span class="input-subtitle">Enter a number in the range 0 to 2</span>
                            <input type="number" min="0" max="2" v-model="form.campus['screens-extra-info']" placeholder="Number here">
                            <span class="feedback">Please enter a number in the range 0 to 2</span>
                        </div>
                    </div>
                    <div class="md-checkbox">
                        <input type="checkbox" v-model="form.campus.tables" id="tables-checkbox">
                        <label for="tables-checkbox">Tables and/or chairs</label>
                    </div>
                    <div class="input-area checkbox-extension" v-show="form.campus.tables">
                        <div class="text-input">
                            <span class="input-title" style="margin-bottom: 0;">Quantity of tables/chairs</span>
                            <span class="input-subtitle">Enter a number in the range 0 to 25</span>
                            <input type="number" min="0" max="25" v-model="form.campus['tables-extra-info']" placeholder="Number here">
                            <span class="feedback">Please enter a number in the range 0 to 25</span>
                        </div>
                    </div>
                    <div class="md-checkbox">
                        <input type="checkbox" v-model="form.campus.cashboxes" id="cashboxes-checkbox">
                        <label for="cashboxes-checkbox">Cashboxes</label>
                    </div>
                    <div class="input-area checkbox-extension" v-show="form.campus.cashboxes">
                        <div class="text-input">
                            <span class="input-title" style="margin-bottom: 0;">How many cashboxes?</span>
                            <span class="input-subtitle">Enter a number in the range 0 to 3</span>
                            <input type="number" v-model="form.campus['cashboxes-extra-info']" placeholder="Number here">
                            <span class="feedback">Please enter a number in the range 0 to 3</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-area">
                <div class="text-input">
                    <span class="input-title" style="margin-bottom: 0;">Paste a link to your setup (optional)</span>
                    <span class="input-subtitle">Upload an image/drawing to Google Drive, change the sharing settings to "anyone with a link," and paste the link here.</span>
                    <input type="text" v-model="form.campus.setup_image" placeholder="Paste link here">
                    <span class="feedback">Please enter a valid url</span>
                </div>
            </div>
        </div>

        <span v-show="form.general.is_fundraiser === 'yes'" class="form-section-title">Fundraiser Questions</span>
        <div v-show="form.general.is_fundraiser === 'yes'" class="input-group">
            <div class="input-area">
                <div class="select-input">
                    <span class="input-title">Type of fundraiser</span>
                    <select v-model="form.fundraiser.fundraiser_type">
                        <option value="select_one" disabled>Select one</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="donation_drive">Donation drive</option>
                        <option value="food_sales">Food Sales</option>
                        <option value="product">Non-Food Product Sale</option>
                        <option value="third_party_fundraiser">Third-party/Online Fundraiser</option>
                    </select>       
                </div>
            </div>
            <div v-show="form.fundraiser.fundraiser_type === 'restaurant'">
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">What is the name of the restaurant?</span>
                        <input type="text" v-model="form.fundraiser['restaurant-name']" placeholder="Type here">
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">What is the address of this restaurant?</span>
                        <textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.fundraiser['restaurant-address']" placeholder="Type here"></textarea>
                    </div>
                </div>
            </div>
            <div v-show="form.fundraiser.fundraiser_type === 'donation_drive'">
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title" style="margin-bottom: 0;">Please list the items to be collected</span>
                        <span class="input-subtitle">Enter specific details, if possible</span>
                        <textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.fundraiser['donation_drive-items-to-be-collected']" placeholder="Write here"></textarea>
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Please list the name, address, and phone of the organization receiving the donation</span>
                        <textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.fundraiser['donation_drive-receiving-organization-information']" placeholder="Write here"></textarea>
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title" style="margin-bottom: 0;">How will you deliver the items to the receiving organization?</span>
                        <span class="input-subtitle">If you plan to pay a driver, how will you raise money?</span>
                        <textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.fundraiser['donation_drive-receiving-organization-delivery-plan']" placeholder="Write here"></textarea>
                    </div>
                </div>
            </div>
            <div v-show="form.fundraiser.fundraiser_type === 'food_sales'">
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title" style="margin-bottom: 0;">Provide a thorough description of your product by answering the following</span>
                        <span class="input-subtitle">
                            What items will you purchase?<br>
                            What items will you make?<br>
                            What services will you purchase?<br>
                            What services will you provide?<br>
                        </span>
                        <textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.fundraiser['food_sales-product-description']" placeholder="Write here"></textarea>
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Expected costs</span><br>
                        $ <input type="number" style="display: inline;" v-model="form.fundraiser['food_sales-expected-costs']" placeholder="Enter a number">
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Expected # of items sold</span><br>
                        <input type="number" v-model="form.fundraiser['food_sales-expected-items-sold']" placeholder="Enter a number">
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Expected selling price</span><br>
                        $ <input type="number" style="display: inline;" v-model="form.fundraiser['food_sales-expected-selling-price']" placeholder="Enter a number">
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Expected income</span><br>
                        $ <input type="number" style="display: inline;" v-model="form.fundraiser['food_sales-expected-income']" placeholder="Enter a number">
                    </div>
                </div>
            </div>
            <div v-show="form.fundraiser.fundraiser_type === 'product'">
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title" style="margin-bottom: 0;">Provide a thorough description of your product by answering the following</span>
                        <span class="input-subtitle">
                            What items will you purchase?<br>
                            What items will you make?<br>
                            What services will you purchase?<br>
                            What services will you provide?<br>
                        </span>
                        <textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.fundraiser['product-product-description']" placeholder="Write here"></textarea>
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Expected costs</span><br>
                        $ <input type="number" style="display: inline;" v-model="form.fundraiser['product-expected-costs']" placeholder="Enter a number">
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Expected items sold</span><br>
                        <input type="number" v-model="form.fundraiser['product-expected-items-sold']" placeholder="Enter a number">
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Expected selling price</span><br>
                        $ <input type="number" style="display: inline;" v-model="form.fundraiser['product-expected-selling-price']" placeholder="Enter a number">
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Expected income</span><br>
                        $ <input type="number" style="display: inline;" v-model="form.fundraiser['product-expected-income']" placeholder="Enter a number">
                    </div>
                </div>
            </div>
            <div v-show="form.fundraiser.fundraiser_type === 'third_party_fundraiser'">
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title" style="margin-bottom: 0;">Paste a link to your online fundraising page</span>
                        <span class="input-subtitle">Ex: Snap Raise, Go Fund Me, etc.</span>
                        <input type="text" v-model="form.fundraiser['third_party_fundraiser-link']" placeholder="Paste link here">
                        <span class="feedback">Please enter a valid url</span>
                    </div>
                </div>
                <div class="input-area">
                    <div class="text-input">
                        <span class="input-title">Sign your name electronically to show that you agree to the following</span>
                        <span class="input-subtitle" style="color: red; font-size: 15px;">I agree to a bunch of random legal stuff here</span>
                        <input type="text" v-model="form.fundraiser['third_party_fundraiser-e-signature']" placeholder="First and last name">
                    </div>
                </div>
            </div>
        </div>

        <button id="submit-button" @click="submitForm()">Submit this request</button>

    </div>
</template>

<script>

    import { serverHost } from '@/constants';

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
                        gym: false,
                        ccc: false,
                        cafeteria: false,
                        library: false,
                        classroom: false,
                        'classroom-extra-info': '',
                        theater: false,
                        location_on_campus: 'select_one',
                        screens: false,
                        'screens-extra-info': '',
                        tables: false,
                        'tables-extra-info': '',
                        cashboxes: false,
                        'cashboxes-extra-info': '',
                        setup_image: ''
                    },
                    fundraiser: {
                        fundraiser_type: 'select_one',

                    }
                }
            }
        },
        methods: {
            submitForm() {
                window.fetch(`${serverHost}/api/submit-request`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(this.form)
                }).then(res => res.json())
                .then(res => console.log(res))
                .catch(err => console.log(err));
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

    #submit-button {
        display: block;
        margin: 0 auto;
        width: 225px;
        height: 70px;
        background: transparent;
        outline: none;
        border: 3px solid black;
        cursor: pointer;
        border-radius: 40px;
        font-size: 18px;
        font-family: 'Avenir';
        transition: .2s ease all;
    }

    #submit-button:hover {
        background: #fccb0b;
        border-color: #fccb0b;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    }

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

    .input-group {
        padding: 0px 100px;
    }

    .checkbox-extension {
        padding-left: 20px;
        border-radius: 8px;
        border: 1px solid rgba(0,0,0,.1);
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
        border-left: 6px solid #fccb0b;
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

    /* checkbox-stuff */
    .md-checkbox {
        position: relative;
        margin: 16px 0;
        text-align: left;
    }
    .md-checkbox.md-checkbox-inline {
        display: inline-block;
    }
    .md-checkbox label {
        cursor: pointer;
        font-weight: normal;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .md-checkbox label:before, .md-checkbox label:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
    }
    .md-checkbox label:before {
        width: 20px;
        height: 20px;
        background: #fff;
        border: 2px solid rgba(0, 0, 0, 0.54);
        border-radius: 2px;
        cursor: pointer;
        transition: background 0.3s;
    }
    .md-checkbox input[type="checkbox"] {
        outline: 0;
        margin-right: 10px;
        visibility: hidden;
    }
    .md-checkbox input[type="checkbox"]:checked + label:before {
        background: #337ab7;
        border: none;
    }
    .md-checkbox input[type="checkbox"]:checked + label:after {
        transform: rotate(-45deg);
        top: 5px;
        left: 4px;
        width: 12px;
        height: 6px;
        border: 2px solid #fff;
        border-top-style: none;
        border-right-style: none;
    }
    .md-checkbox input[type="checkbox"]:disabled + label:before {
        border-color: rgba(0, 0, 0, 0.26);
    }
    .md-checkbox input[type="checkbox"]:disabled:checked + label:before {
        background: rgba(0, 0, 0, 0.26);
    }
    *, *:before, *:after {
        box-sizing: border-box;
    }
</style>
