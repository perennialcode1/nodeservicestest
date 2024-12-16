function ReplaceText(template, replacements) {
    let result = template;
    for (const key in replacements) {
        result = result.replace(`\${${key}}`, replacements[key]);
    }
    return result;
}
function csvToJson(csvString,key) {
    // Step 1: Split the comma-separated string into an array
    const itemsArray = csvString.split(',');
  
    // Step 2: Map the array elements to JSON objects
    const jsonArray = itemsArray.map(item => ({ key: item }));
  
    // Step 3: Convert the array of JSON objects to a JSON string (optional)
    const jsonString = JSON.stringify(jsonArray, null, 2); // Pretty print with 2-space indentation
  
    return jsonString;
  }
function headertoRptHeader(jsondata)
{
    const headerinfo = jsondata.map(row => Object.values(row));
    const columnHeaderString = headerinfo[0][0];
    // Split the string into an array of values
    const headers = columnHeaderString.split(',');
    console.log(headers);
    return headers;
}
module.exports = {
    ReplaceText,
    csvToJson,
    headertoRptHeader
}