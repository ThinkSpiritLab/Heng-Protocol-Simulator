<template>
    <div>
        <div v-if="this.value !== undefined" class="edit-column no-border">
            <div v-for="(obj, key) in value" v-bind:key="key">
                <div class="edit-row">
                    <div class="title">{{ key }}</div>
                    <div class="symbol">:</div>
                    <edit-by-schema
                        v-bind:schema="schema.member"
                        v-bind:value="value[key]"
                        v-bind:debug="debug"
                        v-on:update="val => set(key, val)"
                    />
                    <div class="edit-button" v-on:click="splice(key, 1)">
                        Delete
                    </div>
                </div>
            </div>
            <div class="edit-row">
                <edit-by-schema
                    v-bind:schema="schema.member"
                    v-bind:value="next"
                    v-bind:debug="debug"
                    v-on:update="val => (next = val)"
                />
                <div class="edit-button" v-on:click="push(next)">Add</div>
            </div>
        </div>
        <div v-else>
            <div>value undefined</div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { computetDefaultVal } from "./computetDefaultVal.js";
export default Vue.extend({
    name: "editArray",
    props: ["schema", "value", "debug"],
    data: function () {
        return {
            next: {},
            data: this.value !== undefined ? this.value : []
        };
    },
    created: function () {
        this.next = computetDefaultVal(this.schema.member);
        // console.log(JSON.stringify(this.schema.member));
        if (this.value !== undefined) {
            // for (let key in this.schema.properties) {
            //     Vue.set(this.propsEnabled, key, this.value[key] !== undefined);
            // }
        }
    },
    methods: {
        splice: function (key, len) {
            let res = this.data.splice(key, len);
            this.transmit();
            return res;
        },
        push: function (value) {
            this.data.push(value);
            this.transmit();
        },
        set: function (key, value) {
            this.data[key] = value;
            this.transmit();
        },
        transmit: function () {
            this.$emit("update", this.data);
        }
    },
    components: { editBySchema: () => import("./editBySchema.vue") }
});
</script>
