export default function exe (object){
    const result = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            if (typeof object[key] !== 'object' && key !== 'createdAt'&& key !== 'updatedAt' && key != '__v'){
                result.push({Header: key, accessor: key});
            }
        }
    }

    return result;
}