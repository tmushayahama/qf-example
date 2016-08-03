
/*function doGet() {
 return HtmlService.createTemplateFromFile('Page').evaluate()
 .setTitle('QuickForm Tasks')
 .setSandboxMode(HtmlService.SandboxMode.IFRAME);
 }
 */


/*
 function onOpen() {
 //openForm();
 }
 ;

 function openForm() {
 Logger.log('openForm ran!');

 var html = HtmlService.createHtmlOutputFromFile('index')
 .setSandboxMode(HtmlService.SandboxMode.IFRAME);

 FormApp.getUi()
 .showModalDialog(html, 'Fill in this form');
 return;
 }
 */

//openForm();

var eform = FormApp.openByUrl('https://docs.google.com/forms/u/0/d/1bypRIbC1w2w_VxCKZHldBOQAVv9Uw4yW6f9YOw3IrlA/edit');


var UIPrompt = function () {
 var self = this;
 var ui = FormApp.getUi();
 var response = ui.prompt('Quick Form Import', 'Please enter form url?', ui.ButtonSet.YES_NO);

 self.getUrl = function () {
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.YES) {
   return response.getResponseText();
  }
  return null;
 }
}


function getProcessedForm(formUrl) {
 //  Logger.log('argFirstName: ' + argFirstName);

 // var ss = SpreadsheetApp.getActiveSpreadsheet();

 //  var sheet = ss.getSheetByName('HTML-responses');

 //  var firstNameRange = sheet.getRange('A1');
 //var lastNameRange = sheet.getRange('A2');
 //  var carRange = sheet.getRange('A3');

 // firstNameRange.setValue(argFirstName);
 //lastNameRange.setValue(argLastName);
 // carRange.setValue(argCar);


 //var uiPrompt = new UIPrompt();
 //var url = uiPrompt.getUrl();
 var eform = FormApp.openByUrl(formUrl);
 // var eform = FormApp.getActiveForm();
 //eform.getUi();
 var items = eform.getItems();
 var quickForm = {};
 quickForm.formName = eform.getTitle();
 quickForm.formDescription = eform.getDescription();
 quickForm.formItems = [];

 for (var i in items) {
  quickForm.formItems.push({
   component:
           {
            label: items[i].getTitle()
           }
  });
 }

 Logger.log(' - eform: ' + JSON.stringify(quickForm));

 //document.getElementById("qf-form-json").text(JSON.stringify(quickForm));



 return JSON.stringify(quickForm);

}

function getFormResponses() {
 var quickForm = {};
 quickForm.formName = eform.getTitle();
 quickForm.formDescription = eform.getDescription();
 quickForm.formData = [];
 var formResponses = eform.getResponses();
 for (var i = 0; i < formResponses.length; i++) {
  var formResponse = formResponses[i];
  var formResponse = formResponses[i];
  var itemResponses = formResponse.getItemResponses();

  for (var j = 0; j < itemResponses.length; j++) {
   var itemResponse = itemResponses[j];
   quickForm.formData.push(
           {
            id: itemResponse.getItem().getId(),
            title: itemResponse.getItem().getTitle(),
            value: itemResponse.getResponse(),
            type: itemResponse.getItem().getType()
           }
   );
  }
 }
 return JSON.stringify(quickForm);
}

function doGet(request) {
 var formUrl = request.parameter.formurl;
 return ContentService.createTextOutput(
         request.parameter.callback + '(' + JSON.stringify(getProcessedForm(formUrl)) + ')')
         .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

















