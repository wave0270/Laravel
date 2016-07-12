//khởi tạo div
function SelectorGadget() {
  this.border_width = 5;
  this.border_padding = 2;
  this.b_top = null;
  this.b_left = null;
  this.b_right = null;
  this.b_bottom = null;
  this.selected = [];
  this.rejected = [];
  this.special_mode = null;
  this.path_output_field = null;
  this.sg_div = null;
  this.unbound = false;
  //this.prediction_helper = new DomPredictionHelper();
  this.restricted_elements = jQuery.map(['html', 'body', 'head', 'base'], function(selector) { return jQuery(selector).get(0) });
}
SelectorGadget.prototype = new Object();

SelectorGadget.prototype.makeBorders = function(orig_elem, makeRed) {
  this.removeBorders();
  this.setupBorders();

  if (orig_elem.parentNode)
    var path_to_show = orig_elem.parentNode.tagName.toLowerCase() + ' ' + orig_elem.tagName.toLowerCase();
  else
  var path_to_show = orig_elem.tagName.toLowerCase();

  var elem = jQuery(orig_elem);
  var p = elem.offset();

  var top = p.top;
  var left = p.left;
  var width = elem.outerWidth();
  var height = elem.outerHeight();
  
  this.b_top.css('width', this.px(width + this.border_padding * 2 + this.border_width * 2)).
             css('top', this.px(top - this.border_width - this.border_padding)).
             css('left', this.px(left - this.border_padding - this.border_width));
  this.b_bottom.css('width', this.px(width + this.border_padding * 2 + this.border_width * 2 - 5)).
                css('top', this.px(top + height + this.border_padding)).
                css('left', this.px(left - this.border_padding - this.border_width)).text(path_to_show);
  this.b_left.css('height', this.px(height + this.border_padding * 2)).
              css('top', this.px(top - this.border_padding)).
              css('left', this.px(left - this.border_padding - this.border_width));
  this.b_right.css('height', this.px(height + this.border_padding * 2)).
               css('top', this.px(top - this.border_padding)).
               css('left', this.px(left + width + this.border_padding));
  
  this.b_right.get(0).target_elem = this.b_left.get(0).target_elem = this.b_top.get(0).target_elem = this.b_bottom.get(0).target_elem = orig_elem;

  if (makeRed || elem.hasClass("sg_suggested") || elem.hasClass("sg_selected")) {
    this.b_top.addClass('sg_border_red');
    this.b_bottom.addClass('sg_border_red');
    this.b_left.addClass('sg_border_red');
    this.b_right.addClass('sg_border_red');
  } else {
    if (this.b_top.hasClass('sg_border_red')) {
      this.b_top.removeClass('sg_border_red');
      this.b_bottom.removeClass('sg_border_red');
      this.b_left.removeClass('sg_border_red');
      this.b_right.removeClass('sg_border_red');
    }
  }
  this.showBorders();
};

SelectorGadget.prototype.px = function(p) {
  return p + 'px';
};

SelectorGadget.prototype.showBorders = function() {
  this.b_top.show();
  this.b_bottom.show();
  this.b_left.show();
  this.b_right.show();
};

SelectorGadget.prototype.removeBorders = function() {
  if (this.b_top) {
    this.b_top.hide();
    this.b_bottom.hide();
    this.b_left.hide();
    this.b_right.hide();
  }
};

SelectorGadget.prototype.setupBorders = function() {
  if (!this.b_top) {
    var width = this.border_width + 'px';
    this.b_top = jQuery('<div>').addClass('sg_border').css('height', width).hide().bind("mousedown.sg", { 'self': this }, this.sgMousedown);
    this.b_bottom = jQuery('<div>').addClass('sg_border').addClass('sg_bottom_border').css('height', this.px(this.border_width + 6)).hide().bind("mousedown.sg", { 'self': this }, this.sgMousedown);
    this.b_left = jQuery('<div>').addClass('sg_border').css('width', width).hide().bind("mousedown.sg", { 'self': this }, this.sgMousedown);
    this.b_right = jQuery('<div>').addClass('sg_border').css('width', width).hide().bind("mousedown.sg", { 'self': this }, this.sgMousedown);
    
    this.addBorderToDom();
  }
};

SelectorGadget.prototype.addBorderToDom = function() {
  document.body.appendChild(this.b_top.get(0));
  document.body.appendChild(this.b_bottom.get(0));
  document.body.appendChild(this.b_left.get(0));
  document.body.appendChild(this.b_right.get(0));
};

SelectorGadget.prototype.removeBorderFromDom = function() {
  if (this.b_top) {
    this.b_top.remove();
    this.b_bottom.remove();
    this.b_left.remove();
    this.b_right.remove();
  }
};

SelectorGadget.prototype.sgMouseover = function(e) {
  var gadget = e.data.self;
  if (gadget.unbound) return true;
  if (this == document.body || this == document.body.parentNode) return false;
  var self = jQuery(this);
  if (gadget.special_mode != 'd') { // Jump to any the first selected parent of this node.
    var parent = gadget.firstSelectedOrSuggestedParent(this);
    if (parent != null && parent != this)
      gadget.makeBorders(parent, true);
    else
      gadget.makeBorders(this);
  } else {
    if (!jQuery('.sg_selected', this).get(0)) {
      gadget.makeBorders(this);
    }
  }
  return false;
};

SelectorGadget.prototype.firstSelectedOrSuggestedParent = function(elem) {
  var orig = elem;
  if (jQuery(elem).hasClass('sg_suggested') || jQuery(elem).hasClass('sg_selected')) return elem
  while (elem.parentNode && (elem = elem.parentNode)) {
    if (jQuery.inArray(elem, this.restricted_elements) == -1)
      if (jQuery(elem).hasClass('sg_suggested') || jQuery(elem).hasClass('sg_selected')) return elem
  }
  return null;
};

SelectorGadget.prototype.sgMouseout = function(e) {
  if (e.data.self.unbound) return true;
  if (this == document.body || this == document.body.parentNode) return false;
  e.data.self.removeBorders();
  return false;
};

SelectorGadget.prototype.sgMousedown = function(e) {
	startClick(e);
  return false;
};

SelectorGadget.prototype.setupEventHandlers = function() {
  jQuery("*:not(.sg_ignore)").bind("mouseover.sg", { 'self': this }, this.sgMouseover);
  jQuery("*:not(.sg_ignore)").bind("mouseout.sg", { 'self': this }, this.sgMouseout);
  jQuery("*:not(.sg_ignore)").bind("mousedown.sg", { 'self': this }, this.sgMousedown);
  //jQuery("html").bind("keydown.sg", { 'self': this }, this.listenForActionKeys);
  //jQuery("html").bind("keyup.sg", { 'self': this }, this.clearActionKeys);
};

SelectorGadget.prototype.setMode = function(mode) {
  if (mode == 'browse') {
    this.removeEventHandlers();
  } else if (mode == 'interactive') {
    this.setupEventHandlers();
  }
  //this.clearSelected();
};
// And go!
if (typeof(selector_gadget) == 'undefined' || selector_gadget == null) {
  (function() {
    selector_gadget = new SelectorGadget();
    //selector_gadget.makeInterface();
    //selector_gadget.clearEverything();
    selector_gadget.setMode('interactive');
    //selector_gadget.analytics();
  })();
} else if (selector_gadget.unbound) {
  //selector_gadget.rebind();
} else {
  //selector_gadget.unbind();
}

jQuery('.selector_gadget_loading').remove();