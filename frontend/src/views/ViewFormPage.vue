<template>
    <div>
        <div v-if="isValidForm">
            <div v-if="form.loaded === true">
                <span>From id: <span style="display:inline; background: #ddd; padding: 6px 10px; border-radius: 4px;">{{ formId }}</span></span>
                <span style="font-size: 40px; font-weight: bold;">{{ form.general.student_name }}</span>
                <span>Student email: {{ form.general.student_email }}</span>
                <span>Description: {{ form.general.event_description }}</span>

                <div v-if="typeof form.fundraiser === 'object'" class="div-moved-in">
                    <h2>Fundraiser Details</h2>
                    <span>Fundraiser name: {{ form.fundraiser.fundraiser_name }}</span>

                    <!-- the different types of fundraisers -->
                    <div v-if="form.fundraiser.is_fundraiser === 'food_sales'" class="div-moved-in">
                        <h3>Food Sales Fundraiser</h3>
                        <span>Product description: {{ form.fundraiser['food_sales-product-description'] }}</span>
                        <span>Product expected selling price: ${{ form.fundraiser['food_sales-expected-selling-price'] }}</span>
                        <span>Expected # of items sold: {{ form.fundraiser['food_sales-expected-items-sold'] }}</span>
                        <span>Expected income: ${{ form.fundraiser['food_sales-expected-income'] }}</span>
                        <span>Expected costs: ${{ form.fundraiser['food_sales-expected-costs'] }}</span>
                    </div>

                    <!-- TODO add other fundraiser types -->

                </div>

                <div v-if="typeof form.campus === 'object'" class="div-moved-in">
                    <h2>This activity will occur on campus</h2>
                    <div class="div-moved-in">
                        <h3>Location information</h3>
                        <span v-if="form.campus.cafeteria">-wants the cafeteria</span>
                        <span v-if="form.campus.classroom">-wants classroom(s)</span>
                        <div v-if="form.campus['classroom-extra-info']" class="div-moved-in" style="margin-top: 0; padding-top: 0; margin-bottom: 0; padding-bottom: 0;">
                            <span>{{ form.campus['classroom-extra-info'] }}</span>
                        </div>
                        <span v-if="form.campus.gym">-wants the gym</span>
                        <span v-if="form.campus.library">-wants the library</span>
                        <span v-if="form.campus.theater">-wants the theater</span>
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
                window.fetch(`${serverHost}/api/get-request/${this.$route.params.id}`).then(res => res.json()).then(res => {

                    console.log(res);

                    if (!res.success && res.error === 'no_form_exists') {
                        this.isValidForm = false;
                        return;
                    }

                    this.form = {
                        loaded: true,
                        ...res.data
                    }

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
