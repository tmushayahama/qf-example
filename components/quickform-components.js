angular.module('builder.components', ['builder', 'validator.rules']).config([
 '$builderProvider', function ($builderProvider) {

  $builderProvider.registerComponent('textInput', {
   group: 'Default',
   label: 'First Name',
   description: 'enter your first name',
   placeholder: '',
   required: false,
   validationOptions: [
    {
     label: 'none',
     rule: '/.*/'
    }, {
     label: 'number',
     rule: '[number]'
    }, {
     label: 'email',
     rule: '[email]'
    }, {
     label: 'url',
     rule: '[url]'
    }
   ],
   templateUrl: 'qfretouch/common/views/templates/simple.tpl.html',
   popoverTemplateUrl: 'qfretouch/common/views/templates/popover.tpl.html'
  });

  $builderProvider.registerComponent('datePicker', {
   group: 'Default',
   label: 'Date',
   description: 'when is this happening',
   placeholder: '',
   required: false,
   validationOptions: [
    {
     label: 'none',
     rule: '/.*/'
    }, {
     label: 'number',
     rule: '[number]'
    }, {
     label: 'email',
     rule: '[email]'
    }, {
     label: 'url',
     rule: '[url]'
    }
   ],
   templateUrl: 'qfretouch/common/views/templates/datepicker.tpl.html',
   popoverTemplateUrl: 'qfretouch/common/views/templates/popover.tpl.html'
  });

  $builderProvider.registerComponent('checkbox', {
   group: 'Default',
   label: 'Checkbox',
   description: 'description',
   placeholder: 'placeholder',
   required: false,
   options: ['value one', 'value two'],
   arrayToText: true,
   templateUrl: 'qfretouch/common/views/templates/checkbox.tpl.html',
   popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
  });

  $builderProvider.registerComponent('picturebox', {
   group: 'Default',
   label: 'PictureBox',
   description: 'picture box',
   placeholder: '',
   required: false,
   validationOptions: [
    {
     label: 'none',
     rule: '/.*/'
    }, {
     label: 'number',
     rule: '[number]'
    }, {
     label: 'email',
     rule: '[email]'
    }, {
     label: 'url',
     rule: '[url]'
    }
   ],
   templateUrl: 'qfretouch/common/views/templates/picturebox.tpl.html',
   popoverTemplateUrl: 'qfretouch/common/views/templates/popover.tpl.html'
  });

  $builderProvider.registerComponent('jsignature', {
   group: 'Default',
   label: 'Signature',
   description: 'please sign above',
   placeholder: '',
   required: false,
   validationOptions: [
    {
     label: 'none',
     rule: '/.*/'
    }, {
     label: 'number',
     rule: '[number]'
    }, {
     label: 'email',
     rule: '[email]'
    }, {
     label: 'url',
     rule: '[url]'
    }
   ],
   templateUrl: 'qfretouch/common/views/templates/signature.tpl.html',
   popoverTemplateUrl: 'qfretouch/common/views/templates/popover.tpl.html'
  });




  $builderProvider.registerComponent('textArea', {
   group: 'Default',
   label: 'Text Area',
   description: 'description',
   placeholder: 'placeholder',
   required: false,
   templateUrl: 'qfretouch/common/views/templates/textarea.tpl.html',
   popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
  });
  $builderProvider.registerComponent('radio', {
   group: 'Default',
   label: 'Radio',
   description: 'description',
   placeholder: 'placeholder',
   required: false,
   options: ['value one', 'value two'],
   templateUrl: 'qfretouch/common/views/templates/radiobox.tpl.html',
   popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
  });

  return $builderProvider.registerComponent('select', {
   group: 'Default',
   label: 'Select',
   description: 'description',
   placeholder: 'placeholder',
   required: false,
   options: ['value one', 'value two'],
   templateUrl: 'qfretouch/common/views/templates/select.tpl.html',
   popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
  });
 }
]);