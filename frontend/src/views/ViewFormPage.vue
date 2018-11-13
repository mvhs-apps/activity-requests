<template>
	<div>
		<div v-if="isValidForm">
			<div v-if="form.loaded === true">
				<span>From ID: <span style="display:inline; background: #ddd; padding: 6px 10px; border-radius: 4px;">{{ formId }}</span></span>
				<span style="font-size: 40px; font-weight: bold;">{{ form.general.activity_name }}</span>
				<span>Student requester: {{ form.general.student_name }}</span>
				<span>Student email: {{ form.general.student_email }}</span>
				<span>Adult advisor email: {{ form.general.advisor_email }}</span>
				<span>Description: {{ form.general.event_description }}</span>
				<span>Dates: {{ form.general.all_dates }}</span>
				<br>
				<div v-if="form.general.is_fundraiser === 'yes'" class="div-moved-in">
					<h2>Fundraiser Details</h2>

					<!-- the different types of fundraisers -->
					<div v-if="form.fundraiser.fundraiser_type === 'restaurant'" class="div-moved-in">
						<h3>Restaurant Fundraiser</h3>
						<span>Restaurant name: {{ form.fundraiser['restaurant-address'] }}</span>
						<span>Restaurant address: {{ form.fundraiser['restaurant-name'] }}</span>
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

				<div v-if="form.general.event_on_campus === 'yes'" class="div-moved-in">
					<h2>This activity will occur on campus</h2>
					<span v-if="form.campus.setup_image">Setup Image: {{ form.campus.setup_image }}</span>
					<div class="div-moved-in">
						<h3>Location information</h3>
						<span v-if="form.campus.location_on_campus">Location on campus: {{ form.campus.location_on_campus }}</span>
						<br>
						<span v-if="form.campus.cafeteria">-wants the cafeteria</span>
						<span v-if="form.campus.classroom">-wants classroom(s)</span>
						<div v-if="form.campus['classroom-extra-info']" class="div-moved-in" style="margin-top: 0; padding-top: 0; margin-bottom: 0; padding-bottom: 0;">
							<span>{{ form.campus['classroom-extra-info'] }}</span>
						</div>
						<span v-if="form.campus.gym">-wants the gym</span>
						<span v-if="form.campus.library">-wants the library</span>
						<span v-if="form.campus.theater">-wants the theater</span>
						<span v-if="form.campus.ccc">-wants the College and Career Center</span>
					</div>
					<div class="div-moved-in">
						<h3>Desired equipment</h3>
						<span v-if="form.campus.cashboxes">-wants {{ form.campus['cashboxes-extra-info'] }} cashboxes</span>
						<span v-if="form.campus.screens">-wants {{ form.campus['screens-extra-info'] }} screens/projectors</span>
						<span v-if="form.campus.tables">-wants {{ form.campus['tables-extra-info'] }} tables</span>
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
	import { serverHost } from '@/constants';

	export default {
		data() {
			return {
				formId: this.$route.params.id,
				isValidForm: true,
				form: {
					loaded: false,
					student_email: ''
				}
			}
		},
		methods: {
			loadRequest() {
				window.fetch(`${serverHost}/api/get-request/${this.$route.params.id}`)
				.then(res => res.json())
				.then(res => {
					if (!res.success && res.error === 'no_form_exists') {
						this.isValidForm = false;
						return;
					}

					this.form = {
						loaded: true,
						...res.data
					}

					document.title = this.form.general.activity_name + ' - Activity Requests';

				});
			}
		},
		mounted() {
			this.loadRequest();
		}
	}
</script>


<style scoped>
	.div-moved-in {
		margin-top: 10px;
		margin-left: 16px;
		padding: 10px;
		background: #eee;
		border-radius: 6px;
	}

	span {
		display: block;
	}

	h2 {
		font-size: 30px;
		font-weight: bold;
	}

	h3 {
		font-size: 20px;
		font-weight: bold;
	}
</style>
