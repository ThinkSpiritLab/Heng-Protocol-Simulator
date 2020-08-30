<template>
    <div class="root-pannel">
        <div v-if="myTitle !== undefined" class="title">{{ myTitle }}</div>
        <div class="edit-pannel">
            <input
                v-if="type == 'string'"
                v-bind:value="data"
                v-on:input="event => updateAll(event.target.value)"
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
            <div
                v-else-if="
                    this.type == 'number' ||
                    this.type == 'timestamp' ||
                    this.type == 'timestring'
                "
                class="edit-row no-border"
            >
                <input
                    v-if="this.type == 'number' || this.type == 'timestamp'"
                    v-bind:value="data"
                    v-on:input="
                        event => updateAll(parseInt(event.target.value))
                    "
                />
                <input v-else v-bind:value="new Date(data).toISOString()" />
                <div v-if="this.type == 'number'" class="edit-row no-border">
                    <div
                        v-for="step in (
                    numbersteps
                    )"
                        v-bind:key="step"
                    >
                        <div
                            v-on:click="updateAll(data + step)"
                            class="tool-button"
                        >
                            +{{ step }}
                        </div>
                        <div
                            v-on:click="updateAll(data - step)"
                            class="tool-button"
                        >
                            -{{ step }}
                        </div>
                    </div>
                </div>
                <div
                    v-if="this.type == 'timestamp' || this.type == 'timestring'"
                    class="edit-row no-border"
                >
                    <div
                        v-for="(step,name) in (timestep
                    )"
                        v-bind:key="step"
                        class="edit-column"
                    >
                        <div
                            v-on:click="updateAll(data + step)"
                            class="tool-button"
                        >
                            +{{ name }}
                        </div>
                        <div
                            v-on:click="updateAll(data - step)"
                            class="tool-button"
                        >
                            -{{ name }}
                        </div>
                    </div>
                </div>
                <div
                    v-if="this.type == 'timestamp' || this.type == 'timestring'"
                    v-on:click="updateAll(Date.now())"
                    class="tool-button"
                >
                    CurTime
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
    props: ["schema", "title", "value"],
    data: function () {
        return {
            propsEnabled: {},
            data: {},
            next: {},
            numbersteps: [1, 5, 10, 50, 100],
            timestep: {
                "1h": 3600000,
                "10min": 600000,
                "1min": 60000,
                "10s": 10000,
                "1s": 1000
            }
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
            this.next = this.$refs.nextEdit.getBody();
        } else if (this.type == "string") {
            this.data = new String();
        } else if (
            this.type == "number" ||
            this.type == "timestamp" ||
            this.type == "timestring"
        ) {
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
            console.log("editBySchema update,key" + JSON.stringify(key));
            console.log("editBySchema update,value" + JSON.stringify(val));
            console.log(
                "editBySchema update,result" + JSON.stringify(this.data[key])
            );
            this.transmit();
        },
        updateAll: function (obj) {
            this.data = obj;
            this.transmit();
        },
        getBody: function () {
            if (this.type !== "object") {
                if (this.type === "timestring") {
                    return new Date(this.data).toISOString();
                } else {
                    return this.data;
                }
            } else {
                let body = {};
                for (let key in this.data) {
                    if (this.propsEnabled[key]) {
                        console.log(
                            "editBySchema body,key" + JSON.stringify(key)
                        );
                        console.log(
                            "editBySchema body,value" +
                                JSON.stringify(this.data[key])
                        );
                        console.log(
                            "editBySchema body,result" +
                                JSON.stringify(body[key])
                        );
                        body[key] = JSON.parse(JSON.stringify(this.data[key]));
                    }
                }
                return body;
            }
        },
        transmit: function () {
            console.log(
                "editBySchema transmit,value" + JSON.stringify(this.getBody())
            );
            this.$emit("update", this.getBody());
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
