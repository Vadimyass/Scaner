const DataAPI = async () => {
    try {
      let data = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1D1yytDHV0zN-SpmeKC3Q_BmCFEsCGZhv9ESJkY5cuMc/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyBZ3ZgwzUkRAaXiILwYFZhsBpNAlK7V5jQ"
      );
      let { values } = await data.json();
      let [, ...Data] = values.map((data) => data);
      console.log('downloaded')
      return Data;
    } catch {
      console.log("Error");
    }
  };
  export default DataAPI;