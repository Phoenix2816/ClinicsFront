<template>
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-2">
            <label class="form-label m-0">На странице:</label>
            <select class="form-select form-select-sm" style="width:auto" :value="query.pageSize"
                @change="onPageSizeChange">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
            </select>
            <span class="text-muted ms-2">Всего: {{ totalCount }}</span>
        </div>

        <nav>
            <ul class="pagination pagination-sm mb-0">
                <li class="page-item" :class="{ disabled: query.page <= 1 }">
                    <button class="page-link" @click="go(query.page - 1)" :disabled="query.page <= 1">‹</button>
                </li>
                <li class="page-item" v-for="p in pages" :key="p" :class="{ active: p === query.page }">
                    <button class="page-link" @click="go(p)">{{ p }}</button>
                </li>
                <li class="page-item" :class="{ disabled: query.page >= totalPages }">
                    <button class="page-link" @click="go(query.page + 1)"
                        :disabled="query.page >= totalPages">›</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'PaginationBar',
    props: {
        query: { type: Object, required: true }, // { page, pageSize, sortBy, sortDesc, ... }
        totalCount: { type: Number, required: true }
    },
    emits: ['change-page', 'change-page-size'],
    computed: {
        totalPages() {
            const size = this.query.pageSize || 1
            const total = this.totalCount || 0
            return Math.max(1, Math.ceil(total / size))
        },
        pages() {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1)
        }
    },
    methods: {
        go(p) {
            if (p < 1 || p > this.totalPages) return
            this.$emit('change-page', p)
        },
        onPageSizeChange(e) {
            this.$emit('change-page-size', Number(e?.target?.value ?? this.query.pageSize))
        }
    }
}
</script>
