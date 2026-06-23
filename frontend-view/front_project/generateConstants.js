var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require('fs');
var path = require('path');
var translationsDir = path.join(__dirname, './messages'); // Adjust to your JSON directory
var outputFilePath = path.join(__dirname, './src/constants/translationConstants.ts'); // Adjust to your TypeScript output path
var generateConstants = function () {
    var filePath = path.join(translationsDir, 'en.json'); // Adjust to your JSON file
    var data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    // Helper function to create constants
    var createConstants = function (obj, parentKey) {
        if (parentKey === void 0) { parentKey = ''; }
        var result = '';
        var mappings = [];
        var nestedMappings = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                var formattedKey = key.toLowerCase();
                var fullKey = parentKey ? "".concat(parentKey, ".").concat(key) : key;
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    // Handle nested objects
                    var nestedKey = "".concat(formattedKey).toLowerCase(); // e.g., "homepagesub"
                    nestedMappings.push("  \"".concat(nestedKey.toUpperCase(), "\": \"").concat(key, "\""));
                    result += "  ".concat(nestedKey, ": {\n");
                    var _a = createConstants(value, fullKey), childResult = _a.result, childMappings = _a.mappings;
                    result += childResult;
                    result += "  },\n";
                    nestedMappings.push.apply(nestedMappings, childMappings);
                }
                else if (typeof value === 'string') {
                    // Handle strings
                    mappings.push("  \"".concat(formattedKey.toUpperCase(), "\": \"").concat(key, "\""));
                    result += "  ".concat(formattedKey, ": '").concat(formattedKey, "',\n");
                }
            }
        }
        return { result: result, mappings: __spreadArray(__spreadArray([], mappings, true), nestedMappings, true) };
    };
    // Generate constants
    var _a = createConstants(data), constantsContent = _a.result, mappings = _a.mappings;
    // Create the final output
    var uniqueSet = new Set(mappings);
    var uniqueArray = Array.from(uniqueSet);
    var finalContent = "export const TRANSLATIONSAPPCONSTANTS = {\n  ".concat(uniqueArray.join(',\n  '), "\n};\n");

    // Write the output to file
    fs.writeFileSync(outputFilePath, finalContent);
};
generateConstants();
