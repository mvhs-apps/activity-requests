<template>
    <div>
        <h1>There was an error</h1>
        <span style="display:inline; background: #ddd; padding: 6px 10px; border-radius: 4px;">{{ this.$route.params.error }}</span>
        <br>
        <br>
        <p>Please send us this error code above, and we will try to fix it as soon as possible.</p>
    </div>
</template>


<style scoped>

h1 {
    font-weight: bold;
    font-size: 40px;
}
p {
    margin: 0;
    padding: 0;
}

</style>
