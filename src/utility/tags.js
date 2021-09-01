export function getTagsArray(tags) {
    return typeof (tags) === 'string' ? JSON.parse(tags) : tags;
}

export function tagsArrToString(tags) {
    return tags.map(el => el.value).join(', ') || '';
}

export function createTagsArr(tags) {
    tags = tags.split(',');
    let tagsArr = [];
    for (let index in tags) {
        if (!tags[index].trim().length)
            continue;
        tagsArr.push(tags[index].trim());
    }
    return tagsArr.map((el, index) => {
        let tagValue = el.trim();
        return {
            name: index,
            type: 'text',
            value: tagValue,
        };
    });
}