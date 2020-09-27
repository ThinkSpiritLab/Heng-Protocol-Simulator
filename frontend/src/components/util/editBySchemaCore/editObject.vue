<template>
    <div>
        <div hidden>{{ JSON.stringify(value) }}</div>
        <div v-if="this.value !== undefined" class="edit-column">
            <div v-for="(obj, key) in schema.properties" v-bind:key="key">
                <div class="edit-row">
                    <div class="title">{{ key }}</div>
                    <div class="symbol">:</div>
                    <edit-by-schema
                        v-show="propsEnabled[key]"
                        v-bind:schema="obj"
                        v-bind:value="data[key]"
                        v-bind:debug="debug"
                        v-on:update="val => set(key, val)"
                    />
                    <div v-show="!propsEnabled[key]"></div>
                    <div class="edit-button" v-on:click="switchVisibility(key)">
                        Switch
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div>value undefined</div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
// import editBySchema from "./editBySchema.vue";
export default Vue.extend({
    name: "editObject",
    props: ["schema", "value", "debug"],
    data: function () {
        return {
            propsEnabled: {},
            data: this.value !== undefined ? this.value : {}
        };
    },
    created: function () {
        if (this.value !== undefined) {
            for (let key in this.schema.properties) {
                Vue.set(this.propsEnabled, key, this.value[key] !== undefined);
            }
        }
    },
    updated: function () {
        // console.log(JSON.stringify(this.value));
    },
    beforeUpdate: function () {
        console.log(JSON.stringify(this.value));
        // this.data = Object.assign({}, this.value, this.data);
        for (let key in this.schema.properties) {
            Vue.set(this.propsEnabled, key, this.value[key] !== undefined);
            if (this.value[key] !== undefined) {
                Vue.set(this.data, key, this.value[key]);
            }
        }
    },
    methods: {
        switchVisibility: function (key) {
            this.propsEnabled[key] = !this.propsEnabled[key];
            this.transmit();
        },
        getObjBody: function () {
            let body = {};
            for (let key in this.data) {
                if (this.propsEnabled[key]) {
                    // body[key] = JSON.parse(JSON.stringify(this.data[key]));
                    Vue.set(
                        body,
                        key,
                        JSON.parse(JSON.stringify(this.data[key]))
                    );
                }
            }
            return body;
        },
        set: function (key, value) {
            this.data[key] = value;
            this.transmit();
        },
        transmit: function () {
            let body = this.getObjBody();
            this.$emit("update", body);
        }
    },
    components: { editBySchema: () => import("./editBySchema.vue") }
});
</script>
