import Ember from 'ember';
import DMA_JSON from 'ember-quickstart/staticProps/dma2020';
import US_GEO from 'ember-quickstart/staticProps/USA_StatesGeo';
import d3 from 'd3';
import 'Proj4Leaflet';

var dma_colors = ['#dbf5f7','#a6dcde','#67c5ca','#009da5','#01787e'];
export default Ember.Controller.extend({
    zoom:4,
    lat: 45.528298,
    lng: -122.662986,
    states: US_GEO,dmas: DMA_JSON.DMA_JSON,

    init: function(){
        let L = window.L;
        let dmas = DMA_JSON.DMA_JSON.features.map((dma)=>{ 
            dma.color = dma_colors[Math.floor(Math.random() * 5)]; 
            return dma; 
         });
        console.log(dmas[0]);
        this.set('dmas', dmas);
        var proj = d3.geoAlbersUsa()
        // .translate([0, 0])
        .scale(0.2);

        var AlbersProjection = {
        project: function(latLng) {
            var point = proj([latLng.lng, latLng.lat]);
            return point ? 
                new L.Point(point[0], point[1]) : 
                    new L.Point(0, 0);
        },
        unproject: function(point) {
            var latLng = proj.invert([point.x, point.y]);
            return new L.LatLng(latLng[1], latLng[0]);
        }
        }

        var AlbersCRS = L.extend({}, L.CRS, {
            projection: AlbersProjection,
            transformation: new L.Transformation(1, 0, 1, 0),
            infinite: true
        });
        console.log(window.L);

        let crs = new window.L.Proj.CRS('EPSG:2163',
        '+proj=laea +lat_0=45 +lon_0=-100 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +units=m +no_defs',
        {
            resolutions: [65536, 32768, 16384, 8192, 4096, 2048,1024, 512, 256, 128],
        }
        );
        this.set('crs', crs);

    }
});
