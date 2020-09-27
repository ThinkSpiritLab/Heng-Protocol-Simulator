<template>
    <div class="edit-pannel">
        <edit-by-schema
            ref="paramedit"
            v-bind:title="'签名参数'"
            v-bind:value="param"
            v-bind:schema="schema"
            v-on:update="val => (param = val)"
        />
        <div class="tool-button" v-on:click="pickNonce">pickNonce</div>
        <div>{{ JSON.stringify(param) }}</div>
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
<style scoped>
.edit-pannel {
    border: 2px solid #aaa;
    margin: 10px;
    min-width: 400px;
    /* height: 100%; */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
}

.edit-pannel > {
    justify-content: center;
}
.tool-button {
    border: 1px solid #767676;
    padding: 5px;
    border-radius: 2px;
    margin: 5px;
    background: #efefef;
    word-break: keep-all;
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
