<template>
    <div style="border-bottom: 1px solid #ccc; padding: 18px 20px;">
        <span style="font-size: 18px; font-weight: bold; display: inline;">{{ comment.who }}</span>
        <span style="font-size: 14px; display: inline; margin-left: 14px; color: #555;">
            {{ new Date(comment.time).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timeZone: 'America/Los_Angeles',
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
            }) }}
        </span>
        <div>{{ comment.commentBody }}</div>
    </div>
</template>

<script>
export default {
    props: ['comment']
}
</script>
