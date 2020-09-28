<template>
    <div class="edit-row">
        <input
            v-bind:value="value"
            v-on:input="event => updateAll(event.target.value)"
        />
        <div class="edit-row no-border">
            <div
                v-for="(step, name) in timestep"
                v-bind:key="step"
                class="edit-column"
            >
                <button
                    v-on:click="updateTimeStamp(timestamp + step)"
                    class="edit-button"
                    v-bind:disabled="!isValid"
                >
                    +{{ name }}
                </button>
                <button
                    v-on:click="updateTimeStamp(timestamp - step)"
                    class="edit-button"
                    v-bind:disabled="!isValid"
                >
                    -{{ name }}
                </button>
            </div>
        </div>
        <button
            v-on:click="updateTimeStamp(new Date().getTime())"
            class="edit-button"
        >
            CurTime
        </button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "editTimestamp",
    props: ["value", "debug"],
    created: function () {
        if (this.value === undefined) {
            this.updateAll(this.getDefaultValue());
        }
    },
    data: function () {
        return {
            timestep: {
                "1h": 3600000,
                "10min": 600000,
                "1min": 60000,
                "10s": 10000,
                "1s": 1000
            }
        };
    },
    methods: {
        getDefaultValue: function () {
            return 0;
        },
        updateAll: function (val) {
            this.$emit("update", Number(val));
        },
        updateTimeStamp: function (val) {
            this.updateAll(val);
        }
    },
    computed: {
        isValid: function () {
            return Number.isInteger(this.value);
        },
        timestamp: function () {
            return this.value;
        }
    }
});
</script>
