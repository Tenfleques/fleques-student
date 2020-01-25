import React from 'react';
import Locale from "../../_locale/"
import Utils from "../../utilities"


export default function Home() {
    const user_lang = Utils.AgentUtils.getAgentLocale();

    console.log(user_lang)

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
  