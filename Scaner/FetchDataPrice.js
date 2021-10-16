const DataAPI = async () => {
    try {
      let data = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1KieCn3YXWUME1LD5DkvgQ1raS_UuyoyXDiClMRB1REA/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyA04z-LK4IBXeJRTdvOlcZ2-tre7WS9WyY"
      );
      let { values } = await data.json();
      let [, ...Data] = values.map((data) => data);
      console.log('downloaded')
      //console.log(Data)
      return Data;
    } catch {
      console.log("Error");
    }
  };
  export default DataAPI;