import React from 'react';
import Locale from "../../_locale/"


export default function Home() {
    const user_lang = localStorage.getItem("_locale") || navigator.language || navigator.userLanguage || "ru";

    return (
        <div className="">            
            <div className="container-fluid mt-5">
                <div className="col-12 h3">
                    {Locale[user_lang]["_home_lead"].title}
                </div>
                <div className="col-12">
                    {Locale[user_lang]["_description"].title}
                </div>
            </div>
        </div>      
    );
  }
  