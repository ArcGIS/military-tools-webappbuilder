///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/Color',
  'dojo/dom-geometry',
  'dijit/form/HorizontalSlider',
  'dijit/ColorPalette',
  'dijit/form/NumberSpinner',
  'jimu/dijit/ColorPicker'
],
  function(
    declare,
    BaseWidgetSetting,
    lang,
    array,
    _WidgetsInTemplateMixin,
    Color,
    domGeometry
    ) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'distance-and-direction-setting',      

      postCreate: function(){
        this.setConfig(this.config);

        this.lineColorPicker.onChange = lang.hitch(this, function(val) {
          this.setColorText(this.lineColorPicker.domNode, val); 
        });
        this.circleColorPicker.onChange = lang.hitch(this, function(val) {
          this.setColorText(this.circleColorPicker.domNode, val); 
        });
        this.ellipseColorPicker.onChange = lang.hitch(this, function(val) {
          this.setColorText(this.ellipseColorPicker.domNode, val); 
        });
        this.rangeRingColorPicker.onChange = lang.hitch(this, function(val) {
          this.setColorText(this.rangeRingColorPicker.domNode, val); 
        });
      },

      setConfig: function(config){
        var controls = [{
            colorPicker: this.lineColorPicker,
            numberCtrl: this.lineSize,
            color: config.feedback.lineSymbol.color,
            width: config.feedback.lineSymbol.width
          }, {
            colorPicker: this.circleColorPicker,
            numberCtrl: this.circleSize,
            color: config.feedback.circleSymbol.outline.color,
            width: config.feedback.circleSymbol.outline.width
          }, {
            colorPicker: this.ellipseColorPicker,
            numberCtrl: this.ellipseSize,
            color: config.feedback.ellipseSymbol.outline.color,
            width: config.feedback.ellipseSymbol.outline.width
          }, {
            colorPicker: this.rangeRingColorPicker,
            numberCtrl: this.rangeRingSize,
            color: config.feedback.rangeRingSymbol.outline.color,
            width: config.feedback.rangeRingSymbol.outline.width            
          }
        ];        
        array.forEach(controls, lang.hitch(this, function (control) {
          this.setColorPickerAttr(control.colorPicker, control.color);
          this.setNumberAttr(control.numberCtrl, control.width);
        }));
      },

      getConfig: function(){

        this.config.feedback = {
          lineSymbol: {
            type: "esriSLS",
            style: "esriSLSSolid",
            color: this.lineColorPicker.get("color"), /*Object.keys(this.lineColorPicker.get("color")).map(lang.hitch(this, function (key) {
              return this.lineColorPicker.get("color")[key]
            })), */
            width: this.lineSize.get("value"),            
          },
          circleSymbol: {
            type: "esriSFS",
            style: "esriSFSNull",
            color: [255,0,0,0],
            outline: {
              color: this.circleColorPicker.get("color"), /*Object.keys(this.circleColorPicker.get("color")).map(lang.hitch(this, function (key) {
                return this.circleColorPicker.get("color")[key]
              })),*/
              width: this.circleSize.get("value"),
              type: "esriSLS",
              style: "esriSLSSolid"
            }
          },
          ellipseSymbol: {
            type: "esriSFS",
            style: "esriSFSNull",
            color: [255,0,0,0],
            outline: {
              color: this.ellipseColorPicker.get("color"), /* Object.keys(this.ellipseColorPicker.get("color")).map(lang.hitch(this, function (key) {
                return this.ellipseColorPicker.get("color")[key]
              })),*/
              width: this.ellipseSize.get("value"),
              type: "esriSLS",
              style: "esriSLSSolid"
            }
          },
          rangeRingSymbol: {
            type: "esriSFS",
            style: "esriSFSNull",
            color: [255,0,0,0],
            outline: {
              color: this.rangeRingColorPicker.get("color"), /*Object.keys(this.rangeRingColorPicker.get("color")).map(lang.hitch(this, function (key) {
                return this.rangeRingColorPicker.get("color")[key]
              })),*/
              width: this.rangeRingSize.get("value"),
              type: "esriSLS",
              style: "esriSLSSolid"
            }
          }
        };      

        return this.config;
      },

      setColorPickerAttr: function(ctrl, color) {
        this.setColorText(ctrl.domNode, color);
        ctrl.setColor(new Color(color));
      },

      setNumberAttr: function(ctrl, val) {
        ctrl.set("value", val);
      },

      setColorText: function(domNode, color) {
        if (!(color instanceof Color)) {
          color = new Color(color);
        }
        var text = color.toHex();
        var textColor = (0.2126*color.r + 0.7152*color.g + 0.0722*color.b) > 128 ? new Color([0,0,0]) : new Color([255,255,255]);
        var height = domGeometry.position(domNode).h === 0 ? "36px" :  domGeometry.position(domNode).h + 'px';
        var style = 'width:100%;text-align:center;vertical-align:middle;line-height:' + height + ';color:' + textColor + ';';
        domNode.innerHTML = "<div style='" + style + "'>" + text +"</div>";
      }     
    });
  });