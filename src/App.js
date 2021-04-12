import React, {useState , useCallback} from "react";
import "./style.css";
import axios from "axios";
import debounce from "lodash.debounce";


function App() {

  const [countryList,setCountryList] = useState([]);


  const selectedOptionInfo = async (value) => {
      setCountryList([]);
      const url = "https://restcountries.eu/rest/v2/name/" + value;
      const info = await axios.get(url);
      info.data.map(value => {
       setCountryList(countryList => countryList.concat(value));
      });
  };

  const onPressDebounce = useCallback(debounce(selectedOptionInfo,1000),[]);

    var obj = countryList;
    obj.sort((a,b) => b.population -a.population);
    const tableContent = obj.map((data)=> 
    {return(
      <tr>
      <th><img src = {data.flag} style={{width : "100px"}}/></th>
      <th>{data.name}</th>
      <th>{data.capital}</th>
      <th>{data.region}</th>
      <th>{data.subregion}</th>
      <th>{data.population}</th>
      </tr>
    );})
    
    return (
      <div className="container">
        <input
          onKeyPress={(event) => onPressDebounce(event.target.value)}
          placeholder="enter country name"
        />
        <table>
        <tbody>
          <tr>
            <th>FLAG</th>
            <th>NAME</th>
            <th>CAPITAL</th>
            <th>REGION</th>
            <th>SUBREGION</th>
            <th>POPULATION</th>
          </tr>
          {tableContent}
          </tbody>
        </table>
      </div>
    );
}

export default App;
