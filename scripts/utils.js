// Source: https://stackoverflow.com/questions/24816/escaping-html-strings-with-jquery
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHTML (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}

function secondsToReadableTime(seconds) {
  var minutes = Math.floor((seconds / 60) % 60);
  var hours = Math.floor((seconds / 3600) % 24);
  var days = Math.floor(seconds / 86400);
  var readableTime = "";

  if(minutes + hours + days == 0) {
    readableTime = "just now";
  }
  else {
    readableTime += (days > 0) ? (days + " days ") : "";
    readableTime += (hours > 0) ? (hours + " hours ") : "";
    readableTime += (minutes > 0) ? (minutes + " minutes") : "";
    readableTime += " ago";
  }

  return readableTime;
}

function setElementVisibility(selector, visibility) {
  if(visibility) {
    $(selector).show();
  }
  else {
    $(selector).hide();
  }
}

function setURLData(hash) {
  location.replace("#" + hash);
}

function getURLData() {
  if(window.location.href.indexOf("#") != -1) {
    return window.location.href.split("#")[1];
  }

  return false;
}

function queryAPI(action, params, callback) {
  $.get(API_URL, {action: action, params: params}, function(data){
    if(callback !== undefined) {
      callback(data);
    }
  }, "json");
}
