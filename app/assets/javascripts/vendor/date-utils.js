// Given a date object, return an ISO date string for Rails to consume.
function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z'}

function secondsToTime(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
}

// TODO fix this function for non-ISO capable browsers.
function fromISODateString(d) {
  var tzoffset = (new Date).getTimezoneOffset();
  function fastDateParse(y, m, d, h, i, s, ms){ // this -> tz
    return new Date(y, m - 1, d, h || 0, +(i || 0) - this, s || 0, ms || 0);
  }

  // result function
  return function(isoDateString){
    var tz = isoDateString.substr(10).match(/([\-\+])(\d{1,2}):?(\d{1,2})?/) || 0;
    if (tz)
      tz = tzoffset + (tz[1] == '-' ? -1 : 1) * (tz[3] != null ? +tz[2] * 60 + (+tz[3]) : +tz[2]);
    return fastDateParse.apply(tz || 0, isoDateString.split(/\D/));
  }
}

