<template>
	<div>
		<div v-if="isValidForm">
			<div v-if="form.loaded === true">

				<span style="font-size: 50px; font-weight: bold;">{{ form.general.activity_name }}</span>
				<span style="display: block;">Form ID: <span
					style="display: inline-block; background: #e8e8e8; padding: 6px 10px; border-radius: 4px; font-size: 14px; border: none; color: black;"
				>{{ formId }}</span></span>
				<span>Submitted on: {{ new Date(form.meta.date_submitted).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
						timeZone: 'America/Los_Angeles',
						hour12: true,
						hour: 'numeric',
						minute: 'numeric',
				}) }}</span>
				<br>
				<div class="div-moved-in-style">
					<h2>General Information</h2>
					<span>Student requester: {{ form.general.student_name }}</span>
					<span>Student email: {{ form.general.student_email }}</span>
					<span>Adult advisor email: {{ form.general.advisor_email }}</span>
					<span>Club name: {{ form.general.club_name }}</span>
					<span>Description: {{ form.general.event_description }}</span>
					<span>Start Date: {{ new Date(form.general.start_date).toLocaleDateString('en-US', {
							weekday: 'short',
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							timeZone: 'America/Los_Angeles',
						}) }}
					</span>
					<span>Other Dates &amp; Times: {{ form.general.all_dates }}</span>
				</div>
				<br>
				<div id="approved-area" class="div-moved-in-style">
					<h2>Activity Approval Progress</h2>
					<span>This acitvity <span style="display: inline; font-weight: bold;">cannot</span> occur without the approval of all of the following:</span>
					<br>
					<div>
						<span>Admin approval: </span>
						<span v-if="form.meta.approved.admin" class="approved">{{ approvedText('admin') }}</span>
						<span v-else class="not-approved">{{ notApprovedText }}</span>
					</div>
					<div>
						<span>ASB approval: </span>
						<span v-if="form.meta.approved.asb" class="approved">{{ approvedText('asb') }}</span>
						<span v-else class="not-approved">{{ notApprovedText }}</span>
					</div>
					<div v-if="form.campus.cafeteria || form.campus.includes_food">
						<span>Cafeteria approval: </span>
						<span v-if="form.meta.approved.cafeteria" class="approved">{{ approvedText('cafeteria') }}</span>
						<span v-else class="not-approved">{{ notApprovedText }}</span>
					</div>
					<div v-if="form.campus.gym">
						<span>Gym approval: </span>
						<span v-if="form.meta.approved.gym" class="approved">{{ approvedText('gym') }}</span>
						<span v-else class="not-approved">{{ notApprovedText }}</span>
					</div>
					<div v-if="form.campus.library">
						<span>Library approval: </span>
						<span v-if="form.meta.approved.library" class="approved">{{ approvedText('library') }}</span>
						<span v-else class="not-approved">{{ notApprovedText }}</span>
					</div>
					<div v-if="form.campus.theater">
						<span>Theater approval: </span>
						<span v-if="form.meta.approved.theater" class="approved">{{ approvedText('theater') }}</span>
						<span v-else class="not-approved">{{ notApprovedText }}</span>
					</div>
					<div v-if="form.campus.ccc">
						<span>College and Career Center approval: </span>
						<span v-if="form.meta.approved.ccc" class="approved">{{ approvedText('ccc') }}</span>
						<span v-else class="not-approved">{{ notApprovedText }}</span>
					</div>
					<br>
					<div class="div-moved-in">
						<h3>Approve this request</h3>
						<br>
						<div v-show="!showProcessingApproval">
							<input type="password" v-model="approvePassword" placeholder="Department password" class="text-input-styled">
							<button @click="approve()" class="btn-styled" style="margin-left: 14px; font-size: 14px; width: 100px; height: 50px; display: inline; border-radius: 0;">Approve</button>
							<button @click="unapprove()" class="btn-styled" style="margin-left: 14px; font-size: 14px; width: 100px; height: 50px; display: inline; border-radius: 0;">Unapprove</button>
							<br>
							<span v-show="badPassword" style="padding: 12px 0 0 4px; display: block; color: red; font-weight: bold; font-size: 14px;">Your password is incorrect. Please try again</span>
						</div>
						<span v-show="showProcessingApproval">Please wait</span>
					</div>
				</div>
				<br>
				<div v-if="form.general.is_fundraiser === 'yes'" class="div-moved-in-style">
					<h2>Fundraiser Details</h2>
					<span>This activity is a fundraiser</span>

					<!-- the different types of fundraisers -->
					<div v-if="form.fundraiser.fundraiser_type === 'restaurant'" class="div-moved-in">
						<h3>Restaurant Fundraiser</h3>
						<span>Restaurant name: {{ form.fundraiser['restaurant-name'] }}</span>
						<span>Restaurant address: {{ form.fundraiser['restaurant-address'] }}</span>
					</div>
					<div v-if="form.fundraiser.fundraiser_type === 'donation_drive'" class="div-moved-in">
						<h3>Donation Drive Fundraiser</h3>
						<span>Items to be collected: {{ form.fundraiser['donation_drive-items-to-be-collected'] }}</span>
						<span>Organization recieving the items: {{ form.fundraiser['donation_drive-receiving-organization-information'] }}</span>
						<span>How will items reach organization: {{ form.fundraiser['donation_drive-receiving-organization-delivery-plan'] }}</span>
					</div>
					<div v-if="form.fundraiser.fundraiser_type === 'food_sales'" class="div-moved-in">
						<h3>Food Sales Fundraiser</h3>
						<span>Product description: {{ form.fundraiser['food_sales-product-description'] }}</span>
						<span>Product expected selling price: ${{ form.fundraiser['food_sales-expected-selling-price'] }}</span>
						<span>Expected # of items sold: {{ form.fundraiser['food_sales-expected-items-sold'] }}</span>
						<span>Expected income: ${{ form.fundraiser['food_sales-expected-income'] }}</span>
						<span>Expected costs: ${{ form.fundraiser['food_sales-expected-costs'] }}</span>
					</div>
					<div v-if="form.fundraiser.fundraiser_type === 'product'" class="div-moved-in">
						<h3>Non-Food Product Sales Fundraiser</h3>
						<span>Product description: {{ form.fundraiser['product-product-description'] }}</span>
						<span>Product expected selling price: ${{ form.fundraiser['product-expected-selling-price'] }}</span>
						<span>Expected # of items sold: {{ form.fundraiser['product-expected-items-sold'] }}</span>
						<span>Expected income: ${{ form.fundraiser['product-expected-income'] }}</span>
						<span>Expected costs: ${{ form.fundraiser['product-expected-costs'] }}</span>
					</div>
					<div v-if="form.fundraiser.fundraiser_type === 'third_party_fundraiser'" class="div-moved-in">
						<h3>Third-party/online Fundraiser</h3>
						<span>Link to online fundraising page: {{ form.fundraiser['third_party_fundraiser-link'] }}</span>
						<span>Agreed/signed with the following name: {{ form.fundraiser['third_party_fundraiser-e-signature'] }}</span>
					</div>

				</div>

				<div v-if="form.general.event_on_campus === 'yes'" class="div-moved-in-style">
					<h2>Campus Details</h2>
					<span>This activity will occur on campus</span>
					<span v-if="form.campus.setup_image">Setup Image: <a :href="'//' + form.campus.setup_image" target="_blank">{{ form.campus.setup_image }}</a></span>
					<div class="div-moved-in">
						<h3>Location information</h3>
						<span>Location on campus: {{ form.campus.location_on_campus }}</span>
						<br>
						<span v-if="form.campus.cafeteria">Wants the cafeteria</span>
						<span v-if="form.campus.classroom">Wants classroom(s)</span>
						<div v-if="form.campus['classroom-extra-info']" class="div-moved-in" style="margin-top: 0; padding-top: 0; margin-bottom: 0; padding-bottom: 0;">
							<span>{{ form.campus['classroom-extra-info'] }}</span>
						</div>
						<span v-if="form.campus.gym">Wants the gym</span>
						<span v-if="form.campus.library">Wants the library</span>
						<span v-if="form.campus.theater">Wants the theater</span>
						<span v-if="form.campus.ccc">Wants the College and Career Center</span>
					</div>
					<div class="div-moved-in">
						<h3>Desired equipment</h3>
						<span v-if="form.campus.cashboxes">Wants {{ form.campus['cashboxes-extra-info'] }} cashboxes</span>
						<span v-if="form.campus.screens">Wants {{ form.campus['screens-extra-info'] }} screens/projectors</span>
						<span v-if="form.campus.tables">Wants {{ form.campus['tables-extra-info'] }} tables</span>
						<span v-if="form.campus.speakers">Wants speakers</span>
					</div>
					<div class="div-moved-in" v-if="form.campus.includes_food">
						<h3>Food Involved</h3>
						<span>{{ form.campus.includes_food_extra_info }}</span>
					</div>
				</div>

			</div>
			<div v-else>
				Loading... Please wait.
			</div>
		</div>
		<div v-else>
			This is not a valid form ID.
		</div>
	</div>
</template>


<script>
import { get, put, remove} from '@/utils';
import { serverHost } from '@/constants';

export default {
	data() {
		return {
			formId: this.$route.params.id,
			isValidForm: true,
			badPassword: false,
			notApprovedText: 'NO',
			showProcessingApproval: false,
			approvePassword: '',
			form: {
				loaded: false,
				student_email: ''
			}
		}
	},
	computed: {
		approvedText() {
			return dept => {
				return 'on ' + (new Date(this.form.meta.approved[dept].time)).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					timeZone: 'America/Los_Angeles',
					hour12: true,
					hour: 'numeric',
					minute: 'numeric',
				});
			}
		}
	},
	methods: {
		async loadData() {
			let res;

			if (get(this.formId)) {
				res = get(this.formId)
			} else {

				res = await window.fetch(`${serverHost}/api/get-request/${this.formId}`);
				res = await res.json();

				if (!res.success && res.error === 'no_form_exists') {
					this.isValidForm = false;
					return;
				}

				put(this.formId, res.data);

				res = res.data;
			}

			this.form = {
				loaded: true,
				...res
			}

			window.document.title = this.form.general.activity_name + ' - Activity Requests';
			this.showProcessingApproval = false;
		},
		async approve() {
			let password = this.approvePassword;
			this.approvePassword = '';
			this.showProcessingApproval = true;

			let res = await window.fetch(`${serverHost}/api/approve/${this.formId}`, {
				method: 'POST',
				body: JSON.stringify({ password }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			res = await res.json();
			
			this.badPassword = (res.error === 'bad_password') ? true : false;
			remove('all-forms');
			remove(this.formId);
			this.loadData();
			
		},
		async unapprove() {
			let password = this.approvePassword;
			this.approvePassword = '';
			this.showProcessingApproval = true;

			let res = await window.fetch(`${serverHost}/api/unapprove/${this.formId}`, {
				method: 'POST',
				body: JSON.stringify({ password }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			res = await res.json();
			
			this.badPassword = (res.error === 'bad_password') ? true : false;
			remove('all-forms');
			remove(this.formId);
			this.loadData();
			
		}
	},
	created() {
		this.loadData();
	}
}
</script>

<style scoped src="@/assets/text-input-styled.css"></style>
<style scoped src="@/assets/btn-styled.css"></style>
<style scoped>
	.div-moved-in {
		margin-top: 10px;
		padding: 10px;
		background: #eaeaea;
		border-radius: 6px;
	}

	.div-moved-in-style {
		max-width: 750px;
		margin-top: 10px;
		margin-left: 16px;
		padding: 18px;
		border-radius: 8px;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
		border-left: 6px solid #fccb0b;
		transition: box-shadow .2s ease;
	}

	span {
		display: block;
	}

	h2 {
		font-size: 28px;
		display: inline-block;
		padding-bottom: 0;
		margin-bottom: 6px;
		font-weight: bold;
	}

	h3 {
		font-size: 20px;
		font-weight: bold;
	}

	#approved-area > div > span {
		display: inline;
	}

	.approved {
		color: green;
		font-weight: bold;
	}

	.not-approved {
		color: red;
		font-weight: bold;
	}

</style>
