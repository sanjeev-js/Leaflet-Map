import React from 'react';
import {MapContainer, GeoJSON} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { features } from './states.json';

const App = () => {
  const states = features;
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  const statesData = [
    {
    "state_name" : "Andhra Pradesh",
      "Sex_Ratio": 918
    },
    {
      "state_name" : "Arunanchal Pradesh",
      "Sex_Ratio": 980
    },
    {
      "state_name" : "Assam",
      "Sex_Ratio": 900
    },
    {
      "state_name" : "Bihar",
      "Sex_Ratio": 916
    },
    {
      "state_name" : "Chhattisgarh",
      "Sex_Ratio": 961
    },
    {
      "state_name" : "Gujarat",
      "Sex_Ratio": 854
    },
    {
      "state_name" : "Goa",
      "Sex_Ratio": 1009
    },
    {
     "state_name" : "Haryana",
      "Sex_Ratio": 831
    },
    {
      "state_name" : "Himachal Pradesh",
      "Sex_Ratio": 924
    },
    {
      "state_name": "Jammu & Kashmir",
      "Sex_Ratio": 899
    },
    {
      "state_name" :"Jharkhand",
      "Sex_Ratio": 902
    },
    {
      "state_name": "Karnataka",
      "Sex_Ratio": 939
    },
    {
      "state_name" :"Kerala",
      "Sex_Ratio": 967
    },
    {
      "state_name" :"Madhya Pradesh",
      "Sex_Ratio": 919
    },
    {
      "state_name" :"Maharashtra",
      "Sex_Ratio": 878
    },
    {
      "state_name" :"Manipur",
      "Sex_Ratio": 952
    },
    {
      "state_name" :"Meghalaya",
      "Sex_Ratio": 958
    },
    {
      "state_name" :"Mizoram",
      "Sex_Ratio": 934
    },
    {
      "state_name": "Nagaland",
      "Sex_Ratio": 978
    },
    {
      "state_name" :"NCT of Delhi",
      "Sex_Ratio": 967
    },
    {
      "state_name" :"Odisha",
      "Sex_Ratio": 950
    },
    {
      "state_name" :"Punjab",
      "Sex_Ratio": 889
    },
    {
      "state_name" :"Rajasthan",
      "Sex_Ratio": 861
    },
    {
      "state_name" :"Sikkim",
      "Sex_Ratio": 990
    },
    {
      "state_name" :"Tamil Nadu",
      "Sex_Ratio": 911
    },
    {
      "state_name" : "Telangana",
      "Sex_Ratio" : 1083
    },
    {
      "state_name" : "Tripura",
      "Sex_Ratio" : 911
    },
    {
      "state_name" :"Uttar Pradesh",
      "Sex_Ratio": 879
    },
    {
      "state_name" :"Uttarakhand",
      "Sex_Ratio": 844
    },
    {
      "state_name" :"West Bengal",
      "Sex_Ratio": 951
    }
  ]

  const onEachState = (states, layer) => {
    layer.options.fillColor = states.properties.color;
    const ratio = states.properties.sex_ratio_text;
    const name = states.properties.ST_NM;
    layer.bindPopup(name + "<br> Sex Ratio : " + ratio);
  };

  const processData = (data) => {
    for (let i=0; i < features.length; i++) {
      const state = features[i];
      const stateRatio = data.find(
        (states)=> state.properties.ST_NM === states.state_name
      );
      state.properties.sex_ratio = 0
      state.properties.sex_ratio_text = 0
      if (stateRatio != null) {
        let colors = [ "green", "lightblue", "orange", "yellow", "purple" ]
        let sex_ratio = stateRatio.Sex_Ratio;
        if (sex_ratio < 850) {
          state.properties.color = colors[4];
        }
        if (sex_ratio >= 850 && sex_ratio < 900) {
          state.properties.color = colors[3];
        }
        if (sex_ratio >= 900 && sex_ratio < 950) {
          state.properties.color = colors[2];
        }
        if (sex_ratio >= 950 && sex_ratio < 1000) {
          state.properties.color = colors[1];
        }
        if (sex_ratio >= 1000) {
          state.properties.color = colors[0];
        }

        state.properties.sex_ratio = sex_ratio;
        state.properties.sex_ratio_text = formatNumberWithCommas(sex_ratio)
      }
    }
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  processData(statesData)

  return (
    <MapContainer style={{ height: "90vh" }} zoom={5} center={[20.5, 78.9]}>
      <GeoJSON
        style={mapStyle}
        data={states}
        onEachFeature={onEachState}
      />
    </MapContainer>
  );

}

export default App;
