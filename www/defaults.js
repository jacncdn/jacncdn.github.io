/*!
**|  CyTube Enhancements: Room Defaults
**|
**@preserve
*/
'use strict';

if (!window[CHANNEL.name]) { window[CHANNEL.name] = {}; }

// ##################################################################################################################################

const getOptions = function() {
  $.getJSON(Options_URL, function(data) {
      logTrace('defaults.getOptions', data);
      socket.emit("setOptions", data);
    })
    .fail(function(data) {
      errorData('defaults.getOptions Error', data.status + ": " + data.statusText);
    });
}

// ##################################################################################################################################

const getPermissions = function() {
  $.getJSON(Permissions_URL, function(data) {
      logTrace('defaults.getPermissions', data);
      socket.emit("setPermissions", data);
    })
    .fail(function(data) {
      errorData('defaults.getPermissions Error', data.status + ": " + data.statusText);
    });
}

// ##################################################################################################################################

const getFilters = function() {
  $.getJSON(Filters_URL, function(data) {
      logTrace('defaults.getFilters', data);
      socket.emit("importFilters", data);
    })
    .fail(function(data) {
      errorData('defaults.getFilters Error', data.status + ": " + data.statusText);
    });
}

// ##################################################################################################################################

const getEmotes = function() {
  $.getJSON(Emotes_URL, function(data) {
      logTrace('defaults.getEmotes', data);
      socket.emit("importEmotes", data);
    })
    .fail(function(data) {
      errorData('defaults.getEmotes Error', data.status + ": " + data.statusText);
    });
}

// ##################################################################################################################################

const getCSS = function() {
  let blockerCSS = "";
  let customCSS = "";
  
  function setCustomCSS() {
    if (AGE_RESTRICT && blockerCSS.length < 1) return;
    if (customCSS.length < 1) return;
    
    let data = customCSS;
    if (AGE_RESTRICT) { data += blockerCSS; }
    
    logTrace('defaults.getCSS.setCustomCSS', data);
    
    socket.emit("setChannelCSS", { css: data });
  }
  
  if (AGE_RESTRICT) {
    $.ajax({
      url: BlockerCSS_URL,
      type: 'GET',
      datatype: 'text',
      cache: false,
      error: function(data){
        errorData('defaults.getBlockerCSS Error', data.status + ": " + data.statusText);
      },
      success: function(data){
        logTrace('defaults.getBlockerCSS', data);
        blockerCSS = data;
        setCustomCSS();
      }
    });
  }
  
  $.ajax({
    url: CustomCSS_URL,
    type: 'GET',
    datatype: 'text',
    cache: false,
    error: function(data){
      errorData('defaults.getCustomCSS Error', data.status + ": " + data.statusText);
    },
    success: function(data){
      logTrace('defaults.getCustomCSS', data);
      customCSS = data;
      setCustomCSS();
    }
  });
}

// ##################################################################################################################################

//  DOCUMENT READY
$(document).ready(function() {
  debugData("defaults.documentReady", "");

  getOptions();
  getPermissions();
  getCSS();
  getEmotes();
  getFilters();
});

// ##################################################################################################################################