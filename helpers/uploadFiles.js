const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function ftpFile(tempFilePath, orgid,producttype,type,filename) {
    try {
        //examplepath: Ibiz/41028/Brand/70.jpg
        const formData = new FormData();
        formData.append('superid', orgid);
        formData.append('type', type); // Brand
        formData.append('product', producttype); //IBIZ
        formData.append('file', fs.createReadStream(tempFilePath), filename);
        //formData.append('BRANDID', BrandId);
        const response = await axios.post(process.env[`FTPSERVICEPATH`], formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        if (response.data.message === 'File uploaded successfully') {
            fs.unlinkSync(tempFilePath);
            return { success: true};
        } else {
            fs.unlinkSync(tempFilePath);
            throw new Error('Failed to upload file');
        }
    } catch (error) {
        fs.unlinkSync(tempFilePath);
        throw new Error('Error uploading image: ' + error.message);
    }
    
}

module.exports = {
    ftpFile
}
