const axios = require('axios');
const exeQuery = require('../helpers/exeQuery');
const { ReplaceText } = require('../helpers/utilityFunctions.js');

class notification {

    //#region Notification
   
    NotifyQueue(OrgId, res, callback) {
        exeQuery.GetNotifyData(OrgId, (Error, Results) => {
            if (Error) {
                return res.status(500).json({ error: 'Error Getting Notify Messages' });
            }
            console.log(Results);
            let processedCount = 0;
            if (Results.length === 0) {
                return res.status(200).json({ message: 'No notifications to process' });
            }
            for (let message of Results) {
                const { Id, ToList, EmailBody, Subject, MobileRecipient, WhatsAppBody, CCList } = message;
                try {
                    this.SendWhatsappNotify(OrgId, WhatsAppBody, MobileRecipient, callback);
                    this.SendEmailNotify(OrgId, EmailBody, ToList, Subject, CCList, callback);
                    exeQuery.UpdateNotifyStatus(Id, 1, async (updateError) => {
                        processedCount++;
                        if (updateError) {
                            console.error(`Error updating status  ${Id}:`, updateError.message);
                        }
                        if (processedCount === Results.length) {
                            return res.status(200).json({ message: 'All notifications processed successfully' });
                        }
                    });
                } catch (err) {
                    console.error(`Failed to send email to ${ToList}:`, err.message);
                    
                    exeQuery.UpdateNotifyStatus(Id, 0, async (updateError) => {
                        processedCount++; 
                        if (updateError) {
                            console.error(`Error updating status  ${Id}:`, updateError.message);
                        }
                        if (processedCount === Results.length) {
                            return res.status(200).json({ message: 'All notifications processed successfully, with some failures' });
                        }
                    });
                }
            }
        });
    }
    
    SendWhatsappNotify(OrgId,messageTemplate,Mobile,callback) {
        const whatsappRequestData = { superid: 10001, tomobile: Mobile, message: messageTemplate };
        this.sendRequest(process.env.NOTIFYSERVICE + '/notify/sendwhatsapp', whatsappRequestData, callback);
    }
    SendEmailNotify(OrgId,messageTemplate,userEmail,Subject,CCList,callback) {
        const emailRequestData = { superid: OrgId, toaddr: userEmail, message: messageTemplate, subject: Subject, cc: CCList };
        this.sendRequest(process.env.NOTIFYSERVICE + '/notify/sendmail', emailRequestData, callback);
    }
    sendRequest(url, data, callback) {
        axios.post(url, data)
        .then(response => {
          console.log('Request sent successfully:', response.data);
          callback(null, response.data);
       })
       .catch(error => {
           console.error('Error sending request:', error.message);
           callback(error);
       });
    }
}

module.exports = new notification();
