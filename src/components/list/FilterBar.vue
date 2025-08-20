<template>
    <form class="row g-2 mb-3" @submit.prevent>
        <slot :apply="emitApply" />
    </form>
</template>

<script>
export default {
    name: 'FilterBar',
    emits: ['apply'],
    methods: {
        emitApply(payload) { this.$emit('apply', payload) }
    }
}
</script>
