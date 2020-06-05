import React, { useEffect, useState, ElementRef } from "react";
import axios from "axios";
import { Registration } from "./types";

function RegisterComponent() {
  const [data, setData] = useState<Registration>({
    email: "",
    password: "",
    city: "",
    user_role: "none"
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setData({ ...data, [e.currentTarget.id]: e.currentTarget.value });
  };

  return (
    <div>
      {Object.getOwnPropertyNames(data).map(property => {
        return (
          <div>
            <label>{property.toLowerCase()}</label>
            <input id={property} onChange={handleChange} />
          </div>
        );
      })}

      <button>Send</button>
    </div>
  );
}

export default RegisterComponent;
