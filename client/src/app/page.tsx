import React from "react";

const Home = () => {
  return (
    <section className="py-10 overflow-y-auto grow">
      <div className="container flex flex-col items-center justify-center h-full mx-auto sm:gap-8">
        <figure className="w-48 h-auto">
          <img src="/logo.png" alt="" className="object-cover w-full h-full" />
        </figure>

        <h2 className="text-xl font-semibold">
          သွေးလှူတန်းခြင်းဟာ မွန်မြတ်တဲ့အလှူပါ
        </h2>

        <div className="mt-5 space-y-2 text-sm">
          <p>
            <strong>စေတနာသွေးလှူရှင်</strong>... ဆိုတာ
          </p>

          <ul className="flex flex-col items-start gap-3 leading-8 list-disc">
            <li>အကျိုးအမြတ်တစုံတရာကို မမျှော်လင့်ဘဲ</li>
            <li>
              မည်သူတစ်ဦးတစ်ယောက်ရဲ့ <br /> ဖိအားပေးမှုကြောင့်မှမဟုတ်ဘဲ
            </li>
            <li>
              မိမိဆန္ဒအလျောက်
              <br /> လူနာ၏အသက်ကို ကယ်တင်လိုသော
              <br /> စိတ်စေတနာတစ်ခုကိုသာ
              <br /> အာရုံပြုလှူဒါန်းသူများကို ခေါ်ပါတယ်။
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
