<template>
    <div class="root-pannel">
        <div class="title">{{ myTitle }}</div>
        <div class="symbol">:</div>
        <div class="edit-pannel">
            <div v-if="type == 'string'" class="edit-column">String</div>
            <div v-else-if="type == 'number'" class="edit-column">Number</div>
            <div v-else-if="type == 'array'" class="edit-column">Array</div>
            <div v-else-if="type == 'object'" class="edit-column">
                <div
                    v-for="(obj, key) in this.schema.properties"
                    v-bind:key="obj"
                >
                    <edit-by-schema v-bind:schema="obj" v-bind:title="key" />
                </div>
            </div>
            <div v-else class="edit-column">{{ type }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "editBySchema",
    props: ["schema", "title"],
    data: function() {
        return {
            propsEnabled: {},
            data: {}
        };
    },
    mounted: function() {
        if (this.type == "object") {
            for (let key in this.schema.properties) {
                this.propsEnabled[key] = true;
            }
            console.log(
                "editBySchema mounted,propsEnabled:" +
                    JSON.stringify(this.propsEnabled)
            );
        } else if (this.type == "array") {
            this.data = new Array();
        }
    },
    methods: {
        update: function(key, val) {
            this.data[key] = val;
        }
    },
    computed: {
        type: function() {
            return this.schema.type;
        },
        myTitle: function() {
            return this.title | this.schema.title;
        }
    }
});
</script>

<style scoped>
.root-pannel {
    border: 2px solid #767676;
    border-radius: 4px;
    margin: 10px;
    min-width: 400px;
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
}
.title {
    flex-grow: 0;
    word-break: keep-all;
}
.symbol {
    flex-grow: 0;
}
.edit-pannel {
    border: 1px solid #767676;
    border-radius: 2px;
    margin: 10px;
    min-width: 400px;
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
    border: 1px solid #ccc;
    margin: 10px;
    border-radius: 5px;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
}
.edit-row > * {
    margin: 10px;
    flex-grow: 1;
}
.edit-button {
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
