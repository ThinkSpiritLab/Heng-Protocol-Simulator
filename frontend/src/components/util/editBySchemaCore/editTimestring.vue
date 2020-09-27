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
                    class="tool-button"
                    v-bind:disabled="!isValid"
                >
                    +{{ name }}
                </button>
                <button
                    v-on:click="updateTimeStamp(timestamp - step)"
                    class="tool-button"
                    v-bind:disabled="!isValid"
                >
                    -{{ name }}
                </button>
            </div>
        </div>
        <div
            v-on:click="updateAll(new Date().toISOString())"
            class="tool-button"
        >
            CurTime
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "editTimestring",
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
            return "";
        },
        updateAll: function (val) {
            this.$emit("update", val);
        },
        updateTimeStamp: function (val) {
            this.updateAll(new Date(val).toISOString());
        }
    },
    computed: {
        isValid: function () {
            if (
                !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(this.value)
            ) {
                return false;
            } else {
                try {
                    return new Date(this.value).toISOString() == this.value;
                } catch (error) {
                    return false;
                }
            }
        },
        timestamp: function () {
            return new Date(this.value).getTime();
        }
    }
});
</script>
