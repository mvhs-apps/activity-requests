<template>
	<div>
		<div v-show="showForm">
			<span style="display: block; color: red; font-weight: bold; margin-bottom: 22px; font-size: 22px;">{{ validationHTML }}</span>

			<span class="form-section-title">General Questions</span>
			<div class="input-group">
				<div class="input-area">
					<div class="text-input">
						<span class="input-title">Your Name</span>
						<input type="text" placeholder="First and last" v-model.trim="form.general.requester_name">
						<span class="feedback" style="color: #d50000;"
							v-show="form.general.requester_name && (!form.general.requester_name.includes(' '))"
						>First and last name, please</span>
					</div>
				</div>
				<div class="input-area">
					<div class="text-input">
						<span class="input-title">Activity Name</span>
						<input type="text" placeholder="Type here" v-model.trim="form.general.activity_name">
					</div>
				</div>
				<div class="input-area">
					<div class="text-input">
						<span class="input-title">Organization Name</span>
						<input type="text" v-model="form.general.organization_name" placeholder="Type here">
					</div>
				</div>
				<div class="input-area">
					<div class="text-input">
						<span class="input-title">Your Email</span>
						<input type="text" v-model.trim="form.general.requester_email" placeholder="MVLA email">
						<span class="feedback" style="color: #d50000;"
							v-show="form.general.requester_email && (!form.general.requester_email.includes('@mvla.net') || !emailRegEx.test(form.general.requester_email))"
						>Please enter a valid MVLA email</span>
					</div>
				</div>
				<div class="input-area">
					<div class="text-input">
						<span class="input-title">Adult Advisor Email</span>
						<input type="text" v-model.trim="form.general.advisor_email" placeholder="MVLA email">
						<span class="feedback" style="color: #d50000;"
							v-show="form.general.advisor_email && !emailRegEx.test(form.general.advisor_email)"
						>Please enter a valid email</span>
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
						<span class="feedback" style="color: #d50000;" v-show="(new Date(form.general.start_date)).getTime() < (Date.now() + 1209600000)">
							Please enter a date that is more than two weeks away
						</span>
					</div>
				</div>
				<div class="input-area">
					<div class="text-input">
						<span class="input-title" style="margin-bottom: 0;">
							Write all other dates (including times) of when your event will take place
						</span>
						<span class="input-subtitle">
							For each date of the event, include the following information:<br>
							Start time, end time, set-up time, and clean-up time
						</span>
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
						<span class="input-title">Is your event a fundraiser or donation drive?</span>
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
					<span class="input-title" style="margin-bottom: 0;">Please select desired special facilities</span>
					<span class="input-subtitle" style="color: black;">All of the following facilities <span style="font-weight: bold;">require special approval</span> to be used during your event</span>
					<div class="md-checkbox">
						<input type="checkbox" v-model="form.campus.gym" id="gym-checkbox">
						<label for="gym-checkbox">Gym/fields</label>
					</div>
					<div class="input-area checkbox-extension" v-show="form.campus.gym">
						<div class="text-input">
							<span class="input-title">Please indicate which gym you want and how you will use it</span>
							<div>
								<p class="hoverable"><i class="material-icons">help</i></p>
								<div>Be specific, if possible</div>
							</div>
							<textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.campus['gym-extra-info']" placeholder="Write here"></textarea>
						</div>
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
							<span class="input-subtitle">Password is 'spartans'</span>
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
							<option value="theater">Theater</option>
							<option value="cafeteria">Cafeteria</option>
							<option value="library">Library</option>
							<option value="college_and_career_center">College and Career Center</option>
							<option value="staff_parking_lot">Staff Parking Lot</option>
							<option value="student_parking_lot">Student Parking Lot (BPL)</option>
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
							<option value="multi_use_field">Multi-Use (Turf) Field</option>
							<option value="small_gym">Small Gym</option>
							<option value="big_gym">Big Gym</option>
							<option value="100_wing">100 Wing</option>
							<option value="200_wing">200 Wing</option>
							<option value="300_wing">300 Wing</option>
							<option value="400_wing">400 Wing</option>
							<option value="500_wing">500 Wing</option>
							<option value="600_wing">600 Wing</option>
							<option value="other">Other</option>
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
								<span class="input-title" style="margin-bottom: 0;">Please indicate the quantity of projector(s)/screen(s) you need and how you will use them</span>
								<span class="input-subtitle">No more than 2 projectors or screens</span>
								<textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.campus['screens-extra-info']" placeholder="Be specific, if possible"></textarea>
							</div>
						</div>
						<div class="md-checkbox">
							<input type="checkbox" v-model="form.campus.tables" id="tables-checkbox">
							<label for="tables-checkbox">Tables and/or chairs</label>
						</div>
						<div class="input-area checkbox-extension" v-show="form.campus.tables">
							<div class="text-input">
								<span class="input-title" style="margin-bottom: 0;">Please indicate the quantity of tables/chairs you need and how you will use them</span>
								<span class="input-subtitle">No more than 100 chairs and 15 tables</span>
								<textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.campus['tables-extra-info']" placeholder="Be specific, if possible"></textarea>
							</div>
						</div>
						<div class="md-checkbox">
							<input type="checkbox" v-model="form.campus.cashboxes" id="cashboxes-checkbox">
							<label for="cashboxes-checkbox">Cashboxes</label>
						</div>
						<div class="input-area checkbox-extension" v-show="form.campus.cashboxes">
							<div class="text-input">
								<span class="input-title" style="margin-bottom: 0;">How many cashboxes?</span>
								<span class="input-subtitle">Enter a number between 1 and 3</span>
								<input type="number" min="1" max="3" v-model="form.campus['cashboxes-extra-info']"
											 placeholder="Number here">
								<span class="feedback" v-show="form.campus['cashboxes-extra-info'] < 1 || form.campus['cashboxes-extra-info'] > 3">
									Please enter a number in the range 1 to 3
								</span>
							</div>
						</div>
						<div class="md-checkbox">
							<input type="checkbox" v-model="form.campus.speakers" id="speakers-checkbox">
							<label for="speakers-checkbox">Speakers</label>
						</div>
						<div class="md-checkbox">
							<input type="checkbox" v-model="form.campus['other-equipment']" id="cashboxes-checkbox">
							<label for="cashboxes-checkbox">Other Equipment</label>
						</div>
						<div class="input-area checkbox-extension" v-show="form.campus['other-equipment']">
							<div class="text-input">
								<span class="input-title" style="margin-bottom: 0;">What other equipment is desired?</span>
								<textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.campus['other-equipment-extra-info']" placeholder="Be specific, if possible"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="input-area">
					<div class="text-input">
						<span class="input-title" style="margin-bottom: 0;">Paste a link to your setup (optional)</span>
						<span class="input-subtitle">Upload an image/drawing to Google Drive, change the sharing settings to "anyone with a link," and paste the link here.</span>
						<input type="text" v-model="form.campus.setup_image" placeholder="Paste link here">
						<span class="feedback" v-show="form.campus.setup_image && !urlRegEx.test(form.campus.setup_image)">
							Please enter a valid url
						</span>
					</div>
				</div>
				<div class="md-checkbox">
					<input type="checkbox" v-model="form.campus.includes_food" id="food-checkbox">
					<label for="food-checkbox">This event includes food (food sales or free food)</label>
				</div>
				<div class="input-area checkbox-extension" v-show="form.campus.includes_food">
					<div class="text-input">
						<span class="input-title" style="margin-bottom: 0;">Provide a thorough description of the food by answering the following</span>
						<span class="input-subtitle">
							What items will you be selling/giving away?<br>
							Are these items homemade or store-bought?<br>
							How much food do you plan on selling/giving away?<br>
						</span>
						<textarea class="text-input" @focus="e => e.target.classList.add('expanded')" v-model="form.campus.includes_food_extra_info" placeholder="Write here"></textarea>
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
							<span class="feedback" v-show="!urlRegEx.test(form.fundraiser['third_party_fundraiser-link'])">Please enter a valid url</span>
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
			<br>
			<div style="margin-left: 100px;" id="recaptcha-div"></div><br><br><br>
			<button id="submit-button" @click="submitForm()">Submit this request</button>
		</div>


		<div v-show="!showForm">
			<div class="lds-roller" style="position: absolute; top: 50%; left: 50%; margin-left: -45px; margin-top: -45px;">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<span style="display: block; font-weight: bold; font-size: 32px; position: absolute; top: 50%; left: 50%;margin-left: -70px; margin-top: 40px;">Loading</span>
		</div>

	</div>
</template>

<script>
import {serverHost} from '@/constants';

export default {
	data() {
		return {
			showForm: true,
			validationHTML: '',
			emailRegEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			urlRegEx: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
			recaptchaToken: '',
			form: {
				general: {
					requester_name: '',
					activity_name: '',
					organization_name: '',
					requester_email: '',
					advisor_email: '',
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
		};
	},
	methods: {
		initRecaptcha() {
			setTimeout(() => {
				if (typeof grecaptcha === 'undefined' || typeof grecaptcha.render === 'undefined') {
					return this.initRecaptcha()
				}
				
				grecaptcha.render('recaptcha-div', {
					sitekey: '6Le4XXwUAAAAAG4U7aAFDJwn-J3c352Hgs5hSqOE',
					callback: token => this.recaptchaToken = token
				});

			}, 100);
		},
		scrollUp() {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		},
		submitForm() {

			if (!this.recaptchaToken) {
				this.validationHTML = 'Please check the \'I\'m not a robot\' checkbox';
				return this.scrollUp();
			}

			// validation
			let f = this.form.general;
			if (!f.requester_name || !f.activity_name || !f.organization_name || !f.requester_email || !f.advisor_email || !f.event_description || !f.start_date || !f.all_dates) {
				this.validationHTML = 'You must complete all fields in the \'General Information\' category';
				return this.scrollUp();
			}

			if (this.form.general.event_on_campus === 'select_one') {
				this.validationHTML = 'You must specifiy whether this activity will take place on campus.';
				return this.scrollUp();
			}

			if (this.form.general.is_fundraiser === 'select_one') {
				this.validationHTML = 'You must specifiy whether this activity is a fundraiser';
				return this.scrollUp();
			}

			if (this.form.general.is_fundraiser === 'yes' && this.form.fundraiser.fundraiser_type === 'select_one') {
				this.validationHTML = 'You must select the fundraiser type and complete the corresponding questions';
				return this.scrollUp();
			}


			this.showForm = false;

			window.fetch(`${serverHost}/api/submit-request`, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					recaptchaToken: this.recaptchaToken,
					form: this.form
				})
			}).then(res => res.json()).then(res => {
				console.log(res);
				if (res.success) {
					this.$router.push({
						path: '/form-submitted/' + res.data
					});
				} else {
					this.$router.push({
						path: '/form-error/' + res.error
					});
				}
			}).catch(err => console.log(err));
		}
	},
	created() {
		if (
			/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
			|| navigator.userAgent.match(/Trident.*rv\:11\./)
			|| window.navigator.userAgent.indexOf('MSIE ') > -1
		) {
			this.$router.push({
				path: '/bad-browser'
			});
		}
	},
	mounted() {

		// add recaptcha library
		if (typeof grecaptcha === 'undefined') {
			let script = document.createElement('script');
			script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
			script.async = 'true';
			script.defer = 'true';
			document.body.append(script);
		}

		this.initRecaptcha();
	}
}
</script>

<style scoped src="@/assets/lds-roller.css"></style>
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
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
	}

	.form-section-title {
		font-size: 50px;
		font-weight: bold;
		display: inline-block;
		padding-bottom: 0;
		margin-bottom: 3px;
		background-image: linear-gradient(120deg, #fccb0b 0, #fccb0b 100%);
		background-repeat: no-repeat;
		background-size: 100% 8px;
		background-position: 0 84%;
	}

	.text-input textarea {
		border-radius: 0;
		border: none;
		display: block;
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
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
		box-shadow: 3px 5px 4px 0px rgba(0, 0, 0, .11);
	}

	.input-area {
		min-height: 50px;
		margin: 20px 0 20px 0;
		padding: 16px 0;
	}

	.input-title {
		font-size: 24px;
		margin-bottom: 18px;
		display: inline-block;
	}

	.input-subtitle {
		display: block;
		color: rgb(95, 95, 95);
		font-size: 13px;
		margin-bottom: 18px;
	}

	.text-input > div, .select-input > div {
		display: inline-block;
	}

	.text-input input {
		display: block;
		border: none;
		padding: 0 10px 5px 0;
		outline: none;
		border-radius: 0;
		transition: all .2s ease;
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
		font-size: 16px;
		width: 300px;
	}

	.text-input input[type='file'] {
		display: block;
		border: none;
		padding: 0 10px 5px 0;
		outline: none;
		border-radius: 0;
		transition: all .2s ease;
		font-size: 16px;
		width: 300px;
	}

	.text-input textarea {
		border-radius: 0;
		border: none;
		display: block;
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
		padding: 0 10px 5px 0;
		transition: all .2s ease;
		font-size: 16px;
		outline: none;
		width: 300px;
		height: 30px;
		resize: none;
		transition: all 0.4s ease;
	}

	.text-input:focus {
		border-bottom: 2px solid #1a73e8;
	}

		.text-input input::placeholder, .text-input textarea::placeholder {
		color: #757575;
	}

	.checkbox-extension {
		padding-left: 20px;
		border-radius: 8px;
		padding: 16px 12px;
		border: 1px solid rgba(0, 0, 0, .1);
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
		border-left: 6px solid #fccb0b;
	}

	.hoverable {
		margin: 0 !important;
		font-size: 20px;
	}

	.hoverable + div {
		opacity: 0;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.17), 0 1px 3px 0 rgba(0, 0, 0, 0.17);
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

	.text-input > .feedback {
		display: block;
		font-size: 12px;
		padding-top: 8px;
		/*color: #666666;*/
		color: #d50000;
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

	label {
		margin-left: 10px;
	}
</style>
