export default function exe (object){
    const result = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            result.push({Header: key, accessor: key, filterable: true});
        }
    }

    return result;
}