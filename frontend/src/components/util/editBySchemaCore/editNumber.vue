<template>
    <div class="edit-column no-border">
        <input
            v-bind:value="value"
            v-on:input="event => updateAll(event.target.value)"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "editNumber",
    props: ["value", "debug"],
    created: function () {
        if (this.value === undefined) {
            this.updateAll(this.getDefaultValue());
        }
    },
    methods: {
        getDefaultValue: function () {
            return "";
        },
        updateAll: function (val) {
            this.$emit("update", Number(val));
        }
    }
});
</script>
