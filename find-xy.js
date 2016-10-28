// INPUT: BeaconID_1,2,3 RSSI_1,2,3
// OUTPUT: predicted x, y, error
// TODO: match combinition of bids and find closest rssi, output x,y
function findXY(bid_1, bid_2, bid_3, rssi_1, rssi_2, rssi_3) {
  console.log(String.format('Matching BID:({0},{1},{2})', bid_1, bid_2, bid_3));

  // obj storing x,y with min. error
  var min_err = {
    'x': -1, 'y': -1, 'err': Number.MAX_SAFE_INTEGER
  };
  var row_matched = 0;

  // loop all the data
  for(var i = 0; i < data.length; i++) {
    var row = data[i];
    // match the beacon ids
    if(row.bid_1 == bid_1 && row.bid_2 == bid_2 && row.bid_3 == bid_3) {
      row_matched++;
      var sum_err = 0;
      sum_err = Math.pow(row.rssi_1 - rssi_1, 2) + Math.pow(row.rssi_2 - rssi_2, 2) + Math.pow(row.rssi_3 - rssi_3, 2);
      if(sum_err < min_err.err) {
        min_err.x = row.x;
        min_err.y = row.y;
        min_err.err = Math.sqrt(sum_err/3); // TODO: Modify the error function
      }
    }
  }
  console.log(String.format("Total matched: {0}", row_matched));
  console.log("RESULT:");
  console.log(min_err);
  return min_err;
}

function test() {
  findXY(1,3,4,-23,-43,-44);
}

// Self-defined String.format
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
