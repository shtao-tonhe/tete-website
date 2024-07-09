var lngtxt = "149.124417";
var lattxt = "-35.3075";
var addresstxt = "Australia, Australian Capital Territory";

var map;
var marker;
var infowindow;
var geocoder;
var markersArray = [];

export default {
  data() {
    return {
      lng: "149.124417",
      lat: "-35.3075",
      address: "Australia, Australian Capital Territory"
    };
  },
  mounted() {
    this.setiInit();
    setTimeout(() => {
      this.initAutocomplete();
    }, 1000);
  },
  methods: {
    placeMarker(location) {
      this.clearOverlays(infowindow); //清除地图中的标记
      marker = new google.maps.Marker({
        position: location,
        map: map
      });
      markersArray.push(marker);
      //根据经纬度获取地址
      if (geocoder) {
        geocoder.geocode(
          {
            location: location
          },
          (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                this.attachSecretMessage(
                  marker,
                  results[0].geometry.location,
                  results[0].formatted_address
                );
              }
            } else {
              alert("Geocoder failed due to: " + status);
            }
          }
        );
      }
    },

    //删除所有标记阵列中消除对它们的引用
    clearOverlays(infowindow) {
      if (markersArray && markersArray.length > 0) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray.length = 0;
      }
      if (infowindow) {
        infowindow.close();
      }
    },
    //在地图上显示经纬度地址
    attachSecretMessage(marker, piont, address) {
      var message =
        "<b>坐标:</b>" +
        piont.lat() +
        " , " +
        piont.lng() +
        "<br />" +
        "<b>地址:</b>" +
        address;
      var infowindow = new google.maps.InfoWindow({
        content: message,
        size: new google.maps.Size(50, 50)
      });
      infowindow.open(map, marker);
      this.mapClick(piont.lng(), piont.lat(), address);
    },
    mapClick(lng, lat, address) {
      this.lng = lng;
      this.lat = lat;
      this.address = address;
      this.$emit("showMapData", {
        lng,
        lat,
        address
      });
    },
    setiInit() {
      // 页面加载显示默认lng lat address---begin
      if (lattxt != "" && lngtxt != "" && addresstxt != "") {
        var latlng = new google.maps.LatLng(lattxt, lngtxt);
        marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        markersArray.push(marker);
        this.attachSecretMessage(marker, latlng, addresstxt);
      }
    },
    initAutocomplete() {
      var latlng = new google.maps.LatLng(lattxt, lngtxt);
      var myOptions = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map"), myOptions);

      geocoder = new google.maps.Geocoder(); //实例化地址解析
      //监听点击地图事件
      google.maps.event.addListener(map, "click", event => {
        this.placeMarker(event.latLng);
      });
      // Create the search box and link it to the UI element.
      var input = document.getElementById("pac-input");
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(marker => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          //console.log(place.geometry.location.lat());
          this.mapClick(
            place.geometry.location.lng(),
            place.geometry.location.lat(),
            place.name
          );
          // Create a marker for each place.
          markers.push(
            new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            })
          );

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }
  }
};
