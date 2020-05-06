import Ember from 'ember';
import US_COUNTIES from 'ember-quickstart/staticProps/geojson_counties_fips';
import US_GEO from 'ember-quickstart/staticProps/USA_StatesGeo';
import Leaflet from 'leaflet';

export default Ember.Component.extend({

  crs:  Leaflet.Proj.CRS('EPSG:2400',
  '+lon_0=15.808277777799999 +lat_0=0.0 +k=1.0 +x_0=1500000.0 ' +
  '+y_0=0.0 +proj=tmerc +ellps=bessel +units=m ' +
  '+towgs84=414.1,41.3,603.1,-0.855,2.141,-7.023,0 +no_defs'
  ),

  zoom:4,

  lat: 45.528298,
  lng: -122.662986,

  states: US_GEO,
  counties: US_COUNTIES

});