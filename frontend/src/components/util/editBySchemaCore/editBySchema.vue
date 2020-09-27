<template>
    <div class="root-pannel">
        <div v-if="myTitle !== undefined" class="title">{{ myTitle }}</div>
        <!-- <div>{{ JSON.stringify(value) }}</div> -->
        <div class="edit-pannel no-border">
            <component
                v-bind:is="'edit-' + type"
                v-bind:schema="schema"
                v-bind:value="value"
                v-on:update="updateAll"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import editString from "./editString.vue";
import editNumber from "./editNumber.vue";
import editTimestamp from "./editTimestamp.vue";
import editTimestring from "./editTimestring.vue";
import editObject from "./editObject.vue";
import editArray from "./editArray.vue";
import { computetDefaultVal } from "./computetDefaultVal.js";
export default Vue.extend({
    name: "editBySchema",
    props: ["schema", "title", "value", "debug"],

    methods: {
        updateAll: function (val) {
            this.$emit("update", val);
        },
        transmit: function () {
            let body = this.getData();
            if (this.debug > 2) {
                console.log(
                    "editBySchema transmit,value " + JSON.stringify(body)
                );
            }
            if (body !== undefined) {
                this.$emit("update", body);
            } else {
                if (this.debug > 3) {
                    console.log(
                        "updateBySchema transmit:ignored for undefined"
                    );
                }
            }
        }
    },
    beforeMount: function () {
        if (this.value == undefined) {
            this.updateAll(computetDefaultVal(this.schema));
        }
    },
    computed: {
        type: function () {
            return this.schema.type;
        },
        myTitle: function () {
            // return this.title | this.schema.title;
            if (this.title !== undefined) {
                return this.title;
            } else {
                return this.schema.title;
            }
        }
    },
    components: {
        editString,
        editNumber,
        editTimestamp,
        editTimestring,
        editObject,
        editArray
    }
});
</script>

<style>
.root-pannel {
    border: 0px;
    /* border-left: 1px solid #767676; */
    margin: 10px;
    min-width: 400px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.edit-pannel {
    border: 0px;
    /* border-left: 1px solid #767676; */
    border-radius: 10px;
    margin: 10px;
    min-width: 400px;
    width: 100%;
    max-width: 1200px;
    /* height: 100%; */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
}
.edit-column {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
.edit-row {
    border-left: 1px solid #ccc;
    margin: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.edit-row > * {
    margin: 2px;
    flex-grow: 1;
}
.edit-button {
    border: 1px solid #767676;
    padding: 2px;
    border-radius: 2px;
    /* height: 30px; */
    margin: 2px;
    /* size: 10px; */
    background: #efefef;
    word-break: keep-all;
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-border {
    border: 0px;
}
.title {
    flex-grow: 0;
    word-break: keep-all;
}
.symbol {
    flex-grow: 0;
}
</style>
