<template>
    <div class="root-pannel">
        <div v-if="myTitle !== undefined" class="title">{{ myTitle }}</div>
        <div class="edit-pannel">
            <input
                v-if="type == 'string'"
                v-bind:value="data"
                v-on:input="event => updateAll(event.target.value)"
            />
            <input
                v-else-if="type == 'number'"
                v-bind:value="data"
                v-on:input="event => updateAll(parseInt(event.target.value))"
            />
            <div v-else-if="type == 'array'" class="edit-column">
                <div v-for="(obj, index) in data" v-bind:key="index">
                    <div class="edit-row">
                        <div class="title">{{ index }}</div>
                        <div class="symbol">:</div>
                        <edit-by-schema
                            v-bind:schema="schema.member"
                            v-bind:value="obj"
                            v-on:update="val => update(index, val)"
                        />
                        <div class="edit-button" v-on:click="remove(index)">
                            Remove
                        </div>
                    </div>
                </div>
                <div class="edit-row">
                    <edit-by-schema
                        ref="nextEdit"
                        v-bind:schema="schema.member"
                        v-on:update="val => (next = val)"
                    />
                    <div class="edit-button" v-on:click="push()">
                        Add
                    </div>
                </div>
            </div>
            <div v-else-if="type == 'object'" class="edit-column">
                <div v-for="(obj, key) in schema.properties" v-bind:key="key">
                    <div class="edit-row">
                        <div class="title">{{ key }}</div>
                        <div class="symbol">:</div>
                        <edit-by-schema
                            v-show="propsEnabled[key]"
                            v-bind:schema="obj"
                            v-on:update="val => update(key, val)"
                        />
                        <div v-show="!propsEnabled[key]"></div>
                        <div
                            class="edit-button"
                            v-on:click="switchVisibility(key)"
                        >
                            Switch
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="edit-column">{{ type }}</div>
            <!-- <div>{{ JSON.stringify(propsEnabled) }}</div> -->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "editBySchema",
    props: ["schema", "title", "value"],
    data: function () {
        return {
            propsEnabled: {},
            data: {},
            next: {}
        };
    },
    mounted: function () {
        if (this.type == "object") {
            for (let key in this.schema.properties) {
                // this.propsEnabled[key] = true;
                Vue.set(this.propsEnabled, key, true);
            }
            console.log(
                "editBySchema mounted,propsEnabled:" +
                    JSON.stringify(this.propsEnabled)
            );
        } else if (this.type == "array") {
            this.data = new Array();
            this.next = this.$refs.nextEdit.body;
        } else if (this.type == "string") {
            this.data = new String();
        } else if (this.type == "number") {
            this.data = 0;
        }
        if (this.value) {
            this.data = this.value;
        } else {
            this.transmit();
        }
        console.log("editBySchema mounted,title" + JSON.stringify(this.title));
        console.log(
            "editBySchema mounted,myTitle" + JSON.stringify(this.myTitle)
        );
    },
    methods: {
        push: function () {
            this.data.push(this.next);
            this.transmit();
        },
        remove: function (key) {
            this.data.splice(key, 1);
            this.transmit();
        },
        switchVisibility: function (key) {
            this.propsEnabled[key] = !this.propsEnabled[key];
            this.transmit();
        },
        update: function (key, val) {
            this.data[key] = val;
            this.transmit();
        },
        updateAll: function (obj) {
            this.data = obj;
            this.transmit();
        },
        transmit: function () {
            console.log(
                "editBySchema transmit,value" + JSON.stringify(this.body)
            );
            this.$emit("update", this.body);
        }
    },
    computed: {
        body: function () {
            if (this.type !== "object") {
                return this.data;
            } else {
                let body = {};
                for (let key in this.data) {
                    if (this.propsEnabled[key]) {
                        body[key] = JSON.parse(JSON.stringify(this.data[key]));
                    }
                }
                return body;
            }
        },
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
    }
});
</script>

<style scoped>
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
    border-left: 1px solid #767676;
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
.title {
    flex-grow: 0;
    word-break: keep-all;
}
.symbol {
    flex-grow: 0;
}
</style>
