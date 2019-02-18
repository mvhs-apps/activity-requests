<template>
	<div>
		<div v-if="isValidForm && form.loaded">

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
				<span>Requester name: {{ form.general.requester_name }}</span>
				<span>Requester email: {{ form.general.requester_email }}</span>
				<span>Adult advisor email: {{ form.general.advisor_email }}</span>
				<span>Organization name: {{ form.general.organization_name }}</span>
				<span>Description:</span>
				<div class="requester-comment" v-html="textToHTML(form.general.event_description)"></div>
				<span>Start Date: {{ startDate }}
				</span>
				<span>Other Dates &amp; Times:</span>
				<div class="requester-comment" v-html="textToHTML(form.general.all_dates)"></div>
			</div>
			<br>
			<div id="approved-area" class="div-moved-in-style">
				<h2>Activity Approval Progress</h2>
				<span>This acitvity <span style="display: inline; font-weight: bold;">cannot</span> occur without the approval of all of the following:</span>
				<br>
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
				<div>
					<span>ASB approval: </span>
					<span v-if="form.meta.approved.asb" class="approved">{{ approvedText('asb') }}</span>
					<span v-else class="not-approved">{{ notApprovedText }}</span>
				</div>
				<div>
					<span>Admin approval: </span>
					<span v-if="form.meta.approved.admin" class="approved">{{ approvedText('admin') }}</span>
					<span v-else class="not-approved">{{ notApprovedText }}</span>
				</div>
				<br>
				<div class="div-moved-in">
					<h3>Approve this request</h3>
					<br>
					<div v-show="!showProcessingApproval">
						<input type="text" v-model="approveName" placeholder="Your full name" class="text-input-styled" style="margin-right: 10px;">
						<input type="password" v-model="approvePassword" placeholder="Department password" class="text-input-styled">
						<br><br>
						<button @click="approve()" class="btn-styled" style="font-size: 14px; width: 100px; height: 35px; display: inline;">Approve</button>
						<button @click="unapprove()" class="btn-styled" style="margin-left: 14px; font-size: 14px; width: 100px; height: 35px; display: inline;">Unapprove</button>
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
					<span>Restaurant name:</span>
					<div class="requester-comment">
						{{ form.fundraiser['restaurant-name'] }}
					</div>
					<span>Restaurant address:</span>
					<div class="requester-comment" v-html="textToHTML(form.fundraiser['restaurant-address'])"></div>
				</div>
				<div v-if="form.fundraiser.fundraiser_type === 'donation_drive'" class="div-moved-in">
					<h3>Donation Drive Fundraiser</h3>
					<span>Items to be collected:</span>
					<div class="requester-comment" v-html="textToHTML(form.fundraiser['donation_drive-items-to-be-collected'])"></div>
					<span>Organization recieving the items:</span>
					<div class="requester-comment" v-html="textToHTML(form.fundraiser['donation_drive-receiving-organization-information'])">
					</div>
					<span>How items will reach the organization:</span>
					<div class="requester-comment" v-html="textToHTML(form.fundraiser['donation_drive-receiving-organization-delivery-plan'])"></div>
				</div>
				<div v-if="form.fundraiser.fundraiser_type === 'food_sales'" class="div-moved-in">
					<h3>Food Sales Fundraiser</h3>
					<span>Product description:</span>
					<div class="requester-comment" v-html="textToHTML(form.fundraiser['food_sales-product-description'])"></div>
					<span>Product expected selling price: ${{ form.fundraiser['food_sales-expected-selling-price'] }}</span>
					<span>Expected # of items sold: {{ form.fundraiser['food_sales-expected-items-sold'] }}</span>
					<span>Expected income: ${{ form.fundraiser['food_sales-expected-income'] }}</span>
					<span>Expected costs: ${{ form.fundraiser['food_sales-expected-costs'] }}</span>
				</div>
				<div v-if="form.fundraiser.fundraiser_type === 'product'" class="div-moved-in">
					<h3>Non-Food Product Sales Fundraiser</h3>
					<span>Product description:</span>
					<div class="requester-comment" v-html="textToHTML(form.fundraiser['product-product-description'])"></div>
					<span>Product expected selling price: ${{ form.fundraiser['product-expected-selling-price'] }}</span>
					<span>Expected # of items sold: {{ form.fundraiser['product-expected-items-sold'] }}</span>
					<span>Expected income: ${{ form.fundraiser['product-expected-income'] }}</span>
					<span>Expected costs: ${{ form.fundraiser['product-expected-costs'] }}</span>
				</div>
				<div v-if="form.fundraiser.fundraiser_type === 'third_party_fundraiser'" class="div-moved-in">
					<h3>Third-party/online Fundraiser</h3>
					<span>Link to online fundraising page:</span>
					<div class="requester-comment">
						{{ form.fundraiser['third_party_fundraiser-link'] }}
					</div>
					<span>Agreed/signed with the following name:</span>
					<div class="requester-comment">
						{{ form.fundraiser['third_party_fundraiser-e-signature'] }}
					</div>
				</div>

			</div>
			<br>

			<div v-if="form.general.event_on_campus === 'yes'" class="div-moved-in-style">
				<h2>Campus Details</h2>
				<span>This activity will occur on campus</span>
				<div v-if="form.campus.setup_image">
					<span>Setup Image:</span>
					<div class="requester-comment">
						<a :href="form.campus.setup_image" target="_blank">{{ form.campus.setup_image }}</a>
					</div>
				</div>
				<div class="div-moved-in">
					<h3>Location information</h3>
					<span>Location on campus: {{ form.campus.location_on_campus.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</span>
					<span v-if="form.campus.cafeteria">Wants the cafeteria</span>
					<div v-if="form.campus.classroom">
						<span>Wants classrooms(s) [requester's comments below]</span>
						<div class="requester-comment">
							{{ form.campus['classroom-extra-info'] }}
						</div>
					</div>
					<div v-if="form.campus.gym">
						<span>Wants the gym (requester's comments below)</span>
						<div class="requester-comment">
							{{ form.campus['gym-extra-info'] }}
						</div>
					</div>
					<span v-if="form.campus.library">Wants the library</span>
					<span v-if="form.campus.theater">Wants the theater</span>
					<span v-if="form.campus.ccc">Wants the College and Career Center</span>
				</div>
				<div class="div-moved-in">
					<h3>Desired equipment</h3>
					<span v-if="form.campus.cashboxes">Wants {{ form.campus['cashboxes-extra-info'] }} cashboxes</span>
					<div v-if="form.campus.screens">
						<span>Wants screens/projectors (requester's comments below)</span>
						<div class="requester-comment" v-html="textToHTML(form.campus['screens-extra-info'])"></div>
					</div>
					<div v-if="form.campus.tables">
						<span>Wants tables/chairs (requester's comments below)</span>
						<div class="requester-comment" v-html="textToHTML(form.campus['tables-extra-info'])"></div>
					</div>
					<span v-if="form.campus.speakers">Wants speakers</span>
					<div v-if="form.campus['other-equipment']">
						<span>Wants other equipment (requester's comments below)</span>
						<div class="requester-comment" v-html="textToHTML(form.campus['other-equipment-info'])"></div>
					</div>
				</div>
				<div class="div-moved-in" v-if="form.campus.includes_food">
					<h3>Food Involved</h3>
					<span>Requester's comments below</span>
					<div class="requester-comment" v-html="textToHTML(form.campus.includes_food_extra_info)"></div>
				</div>
			</div>
			<br>
			<div class="div-moved-in-style">
				<h2>Comments</h2>
				<div v-if="form.meta.comments" style="border: 1px solid #ccc; border-radius: 6px;">
					<Comment
						v-for="comment of form.meta.comments"
						v-bind:key="comment.time"
						v-bind:comment="comment"
					/>
				</div>
				<div v-else>
					There are no comments
				</div>
				<br>
				<span v-if="form.meta.comments" style="margin-left: 10px;">{{ form.meta.comments.length }} comment(s)</span>
				<br>
				<div>
					<h3>Add a new comment</h3>
					<input type="text" v-model="commentName" placeholder="Your full name" class="text-input-styled">
					<br><br>
					<textarea v-model="commentBody" class="text-input-styled" placeholder="Type your comment here..." style="width: 80%; border: 1px solid #ccc; font-size: 16px; outline: none; box-shadow: none; border-radius: 8px; padding: 14px; height: 100px;"></textarea>
					<br><br>
					<div>
						<input type="checkbox" v-model="shouldSendEmail" id="shouldSendEmail">
						<label for="shouldSendEmail" style="margin-left: 10px;">Notify (by email) the requesters that someone has commented on their activity request</label>
					</div>
					<br>
					<button v-show="!showProcessingComment" @click="comment()" class="btn-styled" style="font-size: 14px; width: 150px; height: 40px;">Submit comment</button>
					<div v-show="showProcessingComment">
						Please wait...
					</div>
				</div>
			</div>
			
			<br>
			<div v-show="!form.meta.archived" class="div-moved-in-style" style="border-color: red;">
				<h2>Archive this request</h2>
				<span>Only archive activity requests that will <span style="display: inline; font-weight: bold;">never</span> occur. Archiving a request will not delete it — archived requests can be unarchived if needed.</span>
				<br>
				<button @click="archive()" class="btn-styled" style="color: red; border-color: red;">Archive</button>
			</div>

			<div v-show="form.meta.archived" class="div-moved-in-style">
				<h2>Unarchive this request</h2>
				<span>This activity request was archived on {{ 
					new Date(form.meta.archived.time).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
						timeZone: 'America/Los_Angeles',
						hour12: true,
						hour: 'numeric',
						minute: 'numeric',
					}) 
				}} by {{ form.meta.archived.who }}</span>
				<br>
				<span>Accidentally archived this activity request?</span>
				<button @click="unarchive()" class="btn-styled">Unarchive</button>
			</div>
		</div>
		<div v-show="!form.loaded">
			Loading... Please wait.
		</div>
		<div v-show="!isValidForm">
			This is not a valid form ID.
		</div>
	</div>
</template>


<script>
import { get, put, remove} from '@/utils';
import { serverHost } from '@/constants';
import Comment from './components/Comment.vue';

export default {
	components: {
		Comment
	},
	data() {
		return {
			formId: this.$route.params.id,
			isValidForm: true,
			badPassword: false,
			notApprovedText: 'NO',
			showProcessingApproval: false,
			approvePassword: '',
			approveName: '',
			commentName: '',
			commentBody: '',
			showProcessingComment: false,
			shouldSendEmail: true,
			form: {
				loaded: false,
				requester_email: ''
			}
		}
	},
	computed: {
		approvedText() {
			return dept => {
				let whoText = this.form.meta.approved[dept].who ? ' by ' + this.form.meta.approved[dept].who : '';

				return 'on ' + (new Date(this.form.meta.approved[dept].time)).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					timeZone: 'America/Los_Angeles',
					hour12: true,
					hour: 'numeric',
					minute: 'numeric',
				}) + whoText;
			}
		},
		startDate() {
            let date = new Date(this.form.general.start_date);
            date = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
            
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				timeZone: 'America/Los_Angeles',
            })
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
					this.form.loaded = true;
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
			this.showProcessingComment = false;
		},
		async approve() {
			let password = this.approvePassword;
			let who = this.approveName;

			if (!password || !who)
				return;

			this.approvePassword = '';
			this.approveName = '';
			this.showProcessingApproval = true;

			let res = await window.fetch(`${serverHost}/api/approve/${this.formId}`, {
				method: 'POST',
				body: JSON.stringify({ password, who }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			res = await res.json();
			
			this.badPassword = (res.error === 'bad_password') ? true : false;
			remove('all-forms');
			remove(this.formId);
			this.loadData();

			alert('We notified (by email) the requesters that you have approved their activity');
		},
		async unapprove() {
			let password = this.approvePassword;

			if (!password)
				return;

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

			alert('We notified (by email) the requesters that you have unapproved their activity');
		},
		async comment() {
			let who = this.commentName;
			let commentBody = this.commentBody;
			let sendEmail = this.shouldSendEmail;
			this.commentName = '';
			this.commentBody = '';
			this.shouldSendEmail = false;
			this.showProcessingComment = true;

			let res = await window.fetch(`${serverHost}/api/comment/${this.formId}`, {
				method: 'POST',
				body: JSON.stringify({
					who,
					commentBody,
					sendEmail
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			res = await res.json();

			remove('all-forms');
			remove(this.formId);
			this.loadData();
		},
		async archive() {
			let res = await window.fetch(`${serverHost}/api/archive/${this.formId}`, {
				method: 'POST',
				body: JSON.stringify({
					who: prompt('What is your name?', 'Your name here')
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			res = await res.json();

			remove('all-forms');
			remove(this.formId);
			this.loadData();
		},
		async unarchive() {
			let res = await window.fetch(`${serverHost}/api/unarchive/${this.formId}`, {
				method: 'POST',
				body: '{}',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			res = await res.json();

			remove('all-forms');
			remove(this.formId);
			this.loadData();
		},
		textToHTML(text) {
			let div = document.createElement('div');
			div.innerText = text;

			return div.innerHTML;
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

.requester-comment {
	margin-left: 14px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 4px 8px;
	background: #fff;
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
