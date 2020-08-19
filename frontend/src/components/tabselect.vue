<template>
    <div>
        <div v-if="isarray">
            <button
                v-for="tab in tabs"
                v-bind:key="tab"
                v-bind:class="['tab-button', { active: activetab === tab }]"
                v-on:click="click(tab)"
            >
                {{ tab }}
            </button>
        </div>
        <div v-else>
            <button
                v-for="(tab, index) in tabs"
                v-bind:key="index"
                v-bind:class="['tab-button', { active: activetab === tab }]"
                v-on:click="click(tab)"
            >
                {{ index }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "tabselect",
    props: ["tabs", "select"],
    data: function () {
        return {
            activetab: "",
        };
    },
    methods: {
        click: function (tab) {
            this.activetab = tab;
            this.select(tab);
        },
    },
    computed: {
        isarray: function () {
            // console.log(
            //     JSON.stringify(this.tabs) +
            //         " is array?" +
            //         JSON.stringify(this.tabs instanceof Array)
            // );
            return this.tabs instanceof Array;
        },
    },
});
</script>

<style scoped>
.tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
}
.tab-button:hover {
    background: #e0e0e0;
}
.tab-button.active {
    background: #707070;
}
</style>
