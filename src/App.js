import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((result) => {
        console.log(
          "Server should return `additional_data`: ",
          JSON.stringify([
            {
              key: "hobby",
              value: "code",
            },
            {
              key: "phone",
              value: "12345",
            },
          ])
        );
        console.log("But it returns", result[0].additional_data);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);
  return <div>Please open Chrome Dev tools</div>;
}

export default App;
