export default function exe (object){
    const result = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            if (typeof object[key] != 'object') {
            result.push({Header: key, accessor: key, filterable: true});
            }
        }
    }

    return result;
}