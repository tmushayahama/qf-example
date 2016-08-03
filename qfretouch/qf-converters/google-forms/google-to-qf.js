function processTextItem(textItem) {
 return {
  component:
          {
           required: textItem.isRequired(),
          }
 }
}

function processMultipleChoiceItem(multipleChoiceItem) {
 var choices = multipleChoiceItem.getChoices();
 var qfOptions = [];
 for (var i = 0; i < choices.length; i++) {
  qfOptions.push(choices[i].getValue())
 }
 return {
  component:
          {
           options: qfOptions
          }
 }
}


function processItem(item) {
 var result = {};
 result.component = {};

 switch (item.getType()) {
  case 'TEXT':
   result.component = processTextItem(item.asTextItem());
   break;
  case 'TEXT':
   result.component = processMultipleChoiceItem(item.asMultipleChoiceItem());
   break;
 }

 result.component["label"] = items.getTitle();
 result.component["description"] = items.getHelpText();
 return result;
}

function getProcessedForm(formUrl) {
 var eform = FormApp.openByUrl(formUrl);
 var items = eform.getItems();
 var quickForm = {};
 quickForm.formName = eform.getTitle();
 quickForm.formDescription = eform.getDescription();
 quickForm.formItems = [];

 for (var i in items) {
  quickForm.formItems.push(processItem(item[i]));
 }

 Logger.log(' - eform: ' + JSON.stringify(quickForm));


 return JSON.stringify(quickForm);

}

function doGet(request) {
 var formUrl = request.parameter.formurl;
 return ContentService.createTextOutput(
         request.parameter.callback + '(' + JSON.stringify(getProcessedForm(formUrl)) + ')')
         .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

















