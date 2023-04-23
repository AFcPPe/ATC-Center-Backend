exports.hasAllKeys= function (json,keysToCheck) {
// 判断 JSON 是否为空
    if (!json) {
        return false;
    }
// 判断 JSON 是否含有所有键
    return keysToCheck.every(key => json.hasOwnProperty(key));
}