const fs = require('fs');

class JsonParser{
    static readJsonFile(jsonPath)
    {
        let jsonText = fs.readFileSync(jsonPath, 'utf-8');
        let jsonObj = JSON.parse(jsonText);
        return jsonObj;
    }
    static writeJsonFile(jsonPath, object)
    {
        let jsonText = JSON.stringify(object, null, 1);
        fs.writeFileSync(jsonPath, jsonText);
    }
}
module.exports = JsonParser;
