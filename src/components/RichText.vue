<script lang="ts">
import { defineComponent, h, type PropType } from "vue";

import type { RichNode } from "@/types/site";

export default defineComponent({
    name: "RichText",
    props: {
        nodes: {
            type: Array as PropType<RichNode[]>,
            required: true,
        },
        tag: {
            type: String,
            default: "span",
        },
    },
    render() {
        return h(this.tag, this.$attrs, this.nodes);
    },
});
</script>
