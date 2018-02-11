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
  var hours = Math.floor((minutes / 60) % 24);
  var days = Math.floor(hours / 24);
  var readableTime = "";

  if(minutes + hours + days == 0) {
    readableTime = "just now";
  }
  else {
    readableTime += (days > 0) ? (d + " days") : "";
    readableTime += (hours > 0) ? (hours + " hours") : "";
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

function queryAPI(action, params, callback) {
  $.get(API_URL, {action: action, params: params}, function(data){
    if(callback !== undefined) {
      callback(data);
    }
  }, "json");
}