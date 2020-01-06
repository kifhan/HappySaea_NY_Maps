var map;
var features = [];
var icons = {}
function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: new google.maps.LatLng(40.756329,-73.987109), zoom: 13});

  function pinSymbol(color, strokeColor, size, alpha) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
      fillColor: color,
      fillOpacity: alpha,
      strokeColor: strokeColor,
      strokeWeight: 1,
      scale: size
    };
  }

  icons = {
    visible: {
      icon: pinSymbol('#ff7433', '#8a604e', 0.9, 1)
    },
    hidden: {
      icon: pinSymbol('#a2a3a3', '#595859', 0.6, 0.3)
    },
    info: {
      icon: pinSymbol('#ede200', '#696747', 0.6, 0.6)
    }
  };

  features = [
    {
      position: new google.maps.LatLng(40.757990, -73.985536),
      title: 'Times Square',
      type: 'info',
      seekto: '0:22'
    }, {
      position: new google.maps.LatLng(40.757231, -73.989201),
      title: 'Five guys',
      type: 'info',
      seekto: '0:27'
    }, {
      position: new google.maps.LatLng(40.7571823,-73.9894514),
      title: 'THE RIDE NYC',
      type: 'info',
      seekto: '0:31'
    }, {
      position: new google.maps.LatLng(40.760555, -73.990361),
      title: 'BareBurger',
      type: 'info',
      seekto: '0:39'
    }, {
      position: new google.maps.LatLng(40.752748, -73.977234),
      title: 'Grand Central Terminal',
      type: 'info',
      seekto: '0:56'
    }, {
      position: new google.maps.LatLng(40.753267, -73.982257),
      title: 'New York Public Library',
      type: 'info',
      seekto: '1:08'
    }, {
      position: new google.maps.LatLng(40.753003, -73.984118),
      title: 'Blue Bottle Coffee',
      type: 'info',
      seekto: '1:16'
    }, {
      position: new google.maps.LatLng(40.753798, -73.983677),
      title: 'Bryant Park',
      type: 'info',
      seekto: '1:19'
    }, {
      position: new google.maps.LatLng(40.750681, -73.986474),
      title: 'Keens Steakhouse',
      type: 'info',
      seekto: '1:21'
    }, {
      position: new google.maps.LatLng(40.761437, -73.977617),
      title: 'MoMA',
      type: 'info',
      seekto: '1:34'
    }, {
      position: new google.maps.LatLng(40.754680, -73.987023),
      title: 'Joe’s Pizza',
      type: 'info',
      seekto: '1:37'
    }, {
      position: new google.maps.LatLng(40.782981, -73.958971),
      title: 'Guggenheim Museum',
      type: 'info',
      seekto: '1:49'
    }, {
      position: new google.maps.LatLng(40.782865, -73.965334),
      title: 'Central Park',
      type: 'info',
      seekto: '1:55'
    }, {
      position: new google.maps.LatLng(40.742442, -74.006144),
      title: 'Chelsea Market',
      type: 'info',
      seekto: '2:09'
    }, {
      position: new google.maps.LatLng(40.747993, -74.004766),
      title: 'The High Line Park',
      type: 'info',
      seekto: '2:18'
    }, {
      position: new google.maps.LatLng(40.753763, -74.002151),
      title: 'Vessel',
      type: 'info',
      seekto: '2:22'
    }, {
      position: new google.maps.LatLng(40.730911, -74.000654),
      title: 'Blue Note Jazz Club',
      type: 'info',
      seekto: '2:29'
    }, {
      position: new google.maps.LatLng(40.719644, -73.989587),
      title: 'Russ & Daughters Cafe',
      type: 'info',
      seekto: '2:43'
    }, {
      position: new google.maps.LatLng(40.719846, -73.987238),
      title: 'Supermoon Bakehouse',
      type: 'info',
      seekto: '2:49'
    }, {
      position: new google.maps.LatLng(40.726433, -73.984077),
      title: 'Big Gay Ice Cream',
      type: 'info',
      seekto: '2:58'
    }, {
      position: new google.maps.LatLng(40.758740, -73.978673),
      title: 'Rockefeller Center',
      type: 'info',
      seekto: '3:05'
    }, {
      position: new google.maps.LatLng(40.761623, -73.978854),
      title: 'The Halal Guys',
      type: 'info',
      seekto: '3:17'
    }, {
      position: new google.maps.LatLng(40.702067, -74.013572),
      title: 'Staten Island Ferry',
      type: 'info',
      seekto: '3:37'
    }, {
      position: new google.maps.LatLng(40.704517, -74.010948),
      title: 'Luke’s Lobster',
      type: 'info',
      seekto: '3:52'
    }, {
      position: new google.maps.LatLng(40.703571, -73.989562),
      title: 'Dumbo - Photo point with Manhattan Bridge',
      type: 'info',
      seekto: '4:04'
    }, {
      position: new google.maps.LatLng(40.717973, -73.985119),
      title: 'Nakamura',
      type: 'info',
      seekto: '4:11'
    }, {
      position: new google.maps.LatLng(40.743268, -73.990134),
      title: 'Maman',
      type: 'info',
      seekto: '4:24'
    }, {
      position: new google.maps.LatLng(40.741062, -73.989700),
      title: 'Flatiron Building',
      type: 'info',
      seekto: '4:31'
    }, {
      position: new google.maps.LatLng(40.726137, -73.995073),
      title: 'Noho-Soho Shopping street',
      type: 'info',
      seekto: '4:40'
    }, {
      position: new google.maps.LatLng(40.721568, -73.995683),
      title: 'Lombardi’s',
      type: 'info',
      seekto: '4:52'
    }, {
      position: new google.maps.LatLng(40.754538, -73.982501),
      title: 'Gabriel Kreuther',
      type: 'info',
      seekto: '5:13'
    }, {
      position: new google.maps.LatLng(40.671207, -73.963629),
      title: 'Brooklyn Museum',
      type: 'info',
      seekto: '5:56'
    }, {
      position: new google.maps.LatLng(40.669413, -73.962375),
      title: 'Brooklyn Botanical Garden',
      type: 'info',
      seekto: '5:59'
    }, {
      position: new google.maps.LatLng(40.662915, -73.961721),
      title: 'Wendy’s',
      type: 'info',
      seekto: '6:05'
    }, {
      position: new google.maps.LatLng(40.572638, -73.978767),
      title: 'Coney Island',
      type: 'info',
      seekto: '6:09'
    }, {
      position: new google.maps.LatLng(40.703278, -74.017031),
      title: 'Battery Park',
      type: 'info',
      seekto: '6:48'
    }, {
      position: new google.maps.LatLng(40.703260, -74.017356),
      title: 'Statue Cruises',
      type: 'info',
      seekto: '6:50'
    }, {
      position: new google.maps.LatLng(40.689262, -74.044478),
      title: 'Statue of Liberty',
      type: 'info',
      seekto: '6:57'
    }, {
      position: new google.maps.LatLng(40.735886, -74.004950),
      title: 'Magnolia Bakery',
      type: 'info',
      seekto: '7:03'
    }, {
      position: new google.maps.LatLng(40.733031, -74.007255),
      title: 'Jeju Noodle Bar',
      type: 'info',
      seekto: '7:06'
    }, {
      position: new google.maps.LatLng(40.711399, -74.011147),
      title: 'The Oculus',
      type: 'info',
      seekto: '7:15'
    }, {
      position: new google.maps.LatLng(40.713344, -74.013363),
      title: 'One World Observatory',
      type: 'info',
      seekto: '7:22'
    }, {
      position: new google.maps.LatLng(40.708403, -73.957894),
      title: 'Williamsburg',
      type: 'info',
      seekto: '7:40'
    }, {
      position: new google.maps.LatLng(40.719879, -73.961240),
      title: 'Artists & Fleas Williamsburg',
      type: 'info',
      seekto: '7:48'
    }, {
      position: new google.maps.LatLng(40.760522, -73.951040),
      title: 'Roosevelt Island',
      type: 'info',
      seekto: '8:00'
    }, {
      position: new google.maps.LatLng(40.747080, -73.985019),
      title: 'Baekjeong NYC',
      type: 'info',
      seekto: '8:16'
    }, {
      position: new google.maps.LatLng(40.829645, -73.926177),
      title: 'Yankee Stadium',
      type: 'info',
      seekto: '8:23'
    }, {
      position: new google.maps.LatLng(40.828016, -73.925286),
      title: 'McDonald’s',
      type: 'info',
      seekto: '8:31'
    }, {
      position: new google.maps.LatLng(40.810018, -73.950057),
      title: 'Apollo Theater',
      type: 'info',
      seekto: '8:35'
    }, {
      position: new google.maps.LatLng(40.807110, -73.946340),
      title: 'Harlem Shake',
      type: 'info',
      seekto: '8:44'
    }, {
      position: new google.maps.LatLng(40.803103, -73.956564),
      title: 'Melba’s',
      type: 'info',
      seekto: '8:48'
    }, {
      position: new google.maps.LatLng(40.748440, -73.985664),
      title: 'Empire State Building',
      type: 'info',
      seekto: '8:59'
    }, {
      position: new google.maps.LatLng(40.864863, -73.931726),
      title: 'The Met Cloisters',
      type: 'info',
      seekto: '9:10'
    }, {
      position: new google.maps.LatLng(40.865012, -73.927866),
      title: 'Tryon Public House',
      type: 'info',
      seekto: '9:16'
    }, {
      position: new google.maps.LatLng(40.781329, -73.973990),
      title: 'American Museum of Natural History',
      type: 'info',
      seekto: '9:52'
    }, {
      position: new google.maps.LatLng(40.779445, -73.963212),
      title: 'The Metropolitan Museum of Art',
      type: 'info',
      seekto: '10:06'
    }, {
      position: new google.maps.LatLng(40.784396, -73.957872),
      title: 'Cooper Hewitt Smithsonian Design Museum',
      type: 'info',
      seekto: '10:19'
    }, {
      position: new google.maps.LatLng(40.719601, -73.960816),
      title: 'Shelter',
      type: 'info',
      seekto: '10:27'
    }, {
      position: new google.maps.LatLng(40.722199, -73.956678),
      title: 'Westlight',
      type: 'info',
      seekto: '10:36'
    }
  ];

  // Create markers.
  for (var i = 0; i < features.length; i++) {
    var marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map
    });
    features[i].marker = marker;
    tarr = features[i].seekto.split(":");
    features[i].seconds = parseInt(tarr[0]) * 60 + parseInt(tarr[1]);
  };
  
}

  //var tag = document.createElement('script');
  //tag.src = "https://www.youtube.com/iframe_api";
  //var firstScriptTag = document.getElementsByTagName('script')[0];
  //firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
      height: '405',
      width: screen.availWidth > '720' ? '720' : screen.availWidth,
      videoId: 'VDQZQun5E6s',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  function onPlayerReady(event) {
    //player.playVideo();
  }
  var mapSync = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      setTimeout(checkVideo, 500);
      mapSync = true;
    } else {
    	mapSync = false;
    }
  }
  function checkVideo() {
  	if (!mapSync) return;
    //player.stopVideo();
    var ptime = Math.round(player.getCurrentTime());
    for (var i = 0; i < features.length; i++) {
    	if(features[i].seconds == ptime) {
      	if (features[i].type == 'visible') break;
        features[i].type = 'visible';
      	//features[i].marker.setMap(map);
        features[i].marker.setIcon(icons[features[i].type].icon)
        map.panTo(features[i].position);
        if(map.getZoom() != 15) map.setZoom(15);
      } else {
	      //features[i].marker.setMap(null);
        features[i].marker.setIcon(icons[features[i].type].icon)
        features[i].type = 'hidden';
        // map.setZoom(14);
      }
    }
    setTimeout(checkVideo, 1000);
  }