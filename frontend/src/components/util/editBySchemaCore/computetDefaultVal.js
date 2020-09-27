export function computetDefaultVal(schema) {
    if (schema && schema.type) {
        let type = schema.type;
        if (type === "object") {
            let body = {};
            for (let key in schema.properties) {
                body[key] = computetDefaultVal(schema.properties[key]);
            }
            return body;
        } else if (type === "array") {
            return new Array();
        } else if (type === "string") {
            return new String();
        } else if (type === "number" || type === "timestamp") {
            return 0;
        } else if (type === "timestring") {
            return new Date(0).toISOString();
        } else {
            console.error("Unknown Type");
        }
    } else {
        console.error("Unknown Pramater");
    }
}
