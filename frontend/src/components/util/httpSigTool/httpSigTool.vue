<template>
    <div class="edit-pannel">
        <edit-by-schema
            ref="paramedit"
            v-bind:title="'签名参数'"
            v-bind:value="param"
            v-bind:schema="schema"
            v-on:update="val => (param = val)"
        />
        <button class="edit-button" v-on:click="pickNonce">pickNonce</button>
        <!-- <div>{{ JSON.stringify(param) }}</div> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import editBySchema from "../editBySchemaCore/editBySchema.vue";
export default Vue.extend({
    name: "httpSigTool",
    data: function () {
        return {
            param: { nonce: 0, timestamp: "", signature: "", accesskey: "" },
            schema: {
                type: "object",
                properties: {
                    nonce: { type: "number" },
                    timestamp: { type: "timestamp" },
                    signature: { type: "string" },
                    accesskey: { type: "string" }
                }
            }
        };
    },
    methods: {
        transmit: function (val) {
            console.log("httpSigTool transmit,val" + JSON.stringify(val));
            this.$emit("update", val);
        },
        pickNonce: function () {
            // this.param.nonce = Math.floor(Math.random() * 1000);
            Vue.set(this.param, "nonce", Math.floor(Math.random() * 1000));
            this.$refs.paramedit.updateAll(this.param);
        },
        getSignature: function (data) {
            return data;
        }
    },
    components: { editBySchema }
});
</script>
