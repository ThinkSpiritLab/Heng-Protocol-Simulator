<template>
    <edit-by-schema
        v-bind:title="'格式测试'"
        v-bind:schema="schema"
        v-on:update="transmit"
    />
</template>

<script lang="ts">
import Vue from "vue";
import editBySchema from "./editBySchema.vue";
export default Vue.extend({
    name: "schemaTest",
    data: function () {
        return {
            schema: {
                type: "object",
                properties: {
                    str: {
                        type: "string"
                    },
                    arr: {
                        type: "array",
                        member: {
                            type: "string",
                        }
                    },
                    num: {
                        type: "number"
                    }
                }
            }
        };
    },
    methods: {
        transmit: function (val) {
            console.log("schemaTest transmit,val" + JSON.stringify(val));
            this.$emit("update", val);
        }
    },
    components: { editBySchema }
});
</script>
