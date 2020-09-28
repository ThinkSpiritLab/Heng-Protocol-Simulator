<template>
    <div id="app">
        <h1>模拟器</h1>
        <tabselect v-bind:tabs="tabs" v-bind:select="s => (activetab = s)" />
        <keep-alive v-if="activetab === 'judger'">
            <judgersimulator v-bind:class="['tab', 'judger']" />
        </keep-alive>
        <keep-alive v-if="activetab === 'controller'">
            <p v-bind:class="['tab', 'controller']">TODO</p>
            <!-- <judgersimulator v-bind:class="['tab', 'controller']" /> -->
        </keep-alive>
    </div>
</template>

<script lang="ts">
import judgersimulator from "./components/judger-simulator/judger-simulator.vue";
import tabselect from "./components/tabselect.vue";
export default {
    name: "App",
    components: {
        judgersimulator,
        tabselect
    },
    data: function () {
        return {
            tabs: ["judger", "controller"],
            activetab: "judger"
        };
    }
};
</script>

<style>
@import "./assets/main.css";
</style>
