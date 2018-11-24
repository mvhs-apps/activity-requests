<template>
    <div>
        <div>
            <h1 style="display: inline;">All Requests</h1>
            <button class="btn-styled" @click="logout()" style="display: inline; float: right; width: 100px; font-size: 14px; height: 30px;">Logout</button>
            <button class="btn-styled" @click="$router.push({ path: '/asb/passwords' })" style="display: inline; float: right; width: 140px; font-size: 14px; height: 30px; margin-right: 10px;">Change passwords</button>
        </div>
        <div style="margin: 10px; display: flex; flex-wrap: wrap; justify-content: flex-start;">
            <a @click="loadByDateSubmitted()">Show all</a>
            <a @click="loadOnlyApproved()">Show approved</a>
            <a @click="loadOnlyUnapproved()">Show unapproved</a>
            <a @click="sortByClubName()">Sort by club name</a>
        </div>
        <div>
            <Request
                v-for="form of formsToDisplay"
                v-bind:key="form.id"
                v-bind:form="form"
            />
        </div>
    </div>
</template>

<script>
import { isValidCookie, deleteCookie, getASBPassword } from '@/utils';
import { serverHost } from '@/constants';
import Request from './components/Request.vue';

export default {
    components: {
        Request
    },
    data() {
        return {
            allForms: [],
            formsToDisplay: []
        }
    },
    methods: {
        loadByDateSubmitted() {
            this.formsToDisplay = this.getSortedForms();
        },
        loadOnlyApproved() {
            this.formsToDisplay = this.getSortedForms().filter(form => form.meta.approved.asb);
        },
        loadOnlyUnapproved() {
            this.formsToDisplay = this.getSortedForms().filter(form => !form.meta.approved.asb);
        },
        sortByClubName() {
            this.formsToDisplay = this.getSortedForms().sort((a, b) => {
                let aName = a.general.club_name.toLowerCase();
                let bName = b.general.club_name.toLowerCase();

                if (aName > bName) {
                    return 1;
                } else if (aName < bName) {
                    return -1;
                }
                return 0;
            });
        },
        getSortedForms() {
            return JSON.parse(JSON.stringify(this.allForms));
        },
        logout() {
            deleteCookie();
            this.$router.push({ path: '/asb' });
        }
    },
    beforeCreate() {
        if (!isValidCookie()) {
            this.$router.push({ path: '/asb/login?continue=%2Fasb%2Fall-requests' });
        }
    },
    mounted() {
        window.fetch(`${serverHost}/api/get-all-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authPassword: getASBPassword() })
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
                forms.sort((a, b) => {
                    if (a.meta.date_submitted < b.meta.date_submitted) {
                        return 1;
                    } else if (a.meta.date_submitted > b.meta.date_submitted) {
                        return -1;
                    }
                    return 0;
                });
                this.allForms = forms;

                this.loadByDateSubmitted();
            });
    }
}
</script>

<style scoped src="@/assets/btn-styled.css"></style>
<style scoped>
    a {
        cursor: pointer;
        color: #1a73e8;
        margin: 0 10px;
    }
    a:hover {
        text-decoration: underline #1a73e8;
    }
</style>

