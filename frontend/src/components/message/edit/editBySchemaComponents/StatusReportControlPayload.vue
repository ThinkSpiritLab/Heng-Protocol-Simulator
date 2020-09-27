<template>
    <!-- <edit-by-schema
        v-bind:title="'格式测试'"
        v-bind:schema="schema"
        v-bind:debug="5"
        v-on:update="transmit"
    /> -->
    <div>StatusReportControlPayload TODO</div>
</template>

<script lang="ts">
import Vue from "vue";
// import editBySchema from "../editBySchemaCore/editBySchema.vue";
export default Vue.extend({
    name: "StatusReportControlPayload",
    data: function () {
        return {
            schema: {
                type: "object",
                properties: {
                    setReportInterval: {
                        type: "number"
                    }
                }
            }
        };
    },
    methods: {
        transmit: function (val) {
            console.log(
                "StatusReportControlPayload transmit,val" + JSON.stringify(val)
            );
            this.$emit("update", val);
        }
    }
    // components: { editBySchema }
});
</script>
