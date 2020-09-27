<template>
    <div>
        <edit-by-schema
            v-bind:title="'格式测试'"
            v-bind:schema="schema"
            v-bind:value="val"
            v-bind:debug="5"
            v-on:update="transmit"
        />
        <edit-by-schema
            v-bind:title="'编辑测试'"
            v-bind:schema="schema"
            v-bind:value="val"
            v-bind:debug="5"
            v-on:update="transmit"
        />
        <!-- <div>{{ val }}</div> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import editBySchema from "../../../util/editBySchemaCore/editBySchema.vue";
export default Vue.extend({
    name: "schemaTest",
    data: function () {
        return {
            val: {
                str: "123",
                num: 0,
                timestamp: 0,
                timestring: "",
                strarr: [],
                numarr: [],
                timestamparr: [],
                timestringarr: []
            },
            schema: {
                type: "object",
                properties: {
                    str: {
                        type: "string"
                    },
                    num: {
                        type: "number"
                    },
                    timestamp: {
                        type: "timestamp"
                    },
                    timestring: {
                        type: "timestring"
                    },
                    strarr: {
                        type: "array",
                        member: {
                            type: "string"
                        }
                    },
                    numarr: {
                        type: "array",
                        member: { type: "number" }
                    },
                    timestamparr: {
                        type: "array",
                        member: { type: "timestamp" }
                    },
                    timestringarr: {
                        type: "array",
                        member: { type: "timestring" }
                    }
                }
            }
        };
    },
    methods: {
        transmit: function (val) {
            console.log("schemaTest transmit,val" + JSON.stringify(val));
            this.$emit("update", val);
            this.val = val;
        }
    },
    components: { editBySchema }
});
</script>
