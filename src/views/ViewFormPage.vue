<template>
    <div>
        {{ formId }}
    </div>
</template>


<script>
    export default {
        data() {
            return {
                formId: this.$route.params.id
            }
        }
    }
</script>
