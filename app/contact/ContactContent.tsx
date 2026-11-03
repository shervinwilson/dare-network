"use client";

import Script from "next/script";

export default function ContactContent() {
  return (
    <>
      <main className="contact-page">
        <div
          data-elementor-type={"wp-page"}
          data-elementor-id={"660"}
          className={"elementor elementor-660"}
          data-elementor-post-type={"page"}
        >
          <div
            className={
              "elementor-element elementor-element-c374a31 e-flex e-con-boxed e-con e-parent"
            }
            data-id={"c374a31"}
            data-element_type={"container"}
            data-e-type={"container"}
            data-settings={'{"background_background":"classic"}'}
          >
            <div className={"e-con-inner"}>
              <div
                className={
                  "elementor-element elementor-element-50e0ece elementor-widget__width-initial elementor-widget elementor-widget-heading"
                }
                data-id={"50e0ece"}
                data-element_type={"widget"}
                data-e-type={"widget"}
                data-widget_type={"heading.default"}
              >
                <h1
                  className={"elementor-heading-title elementor-size-default"}
                >
                  {" "}
                  Let&apos;s talk about what you actually need.
                </h1>
              </div>

              <div
                className={
                  "elementor-element elementor-element-46a28b6 elementor-widget__width-initial elementor-widget elementor-widget-heading"
                }
                data-id={"46a28b6"}
                data-element_type={"widget"}
                data-e-type={"widget"}
                data-widget_type={"heading.default"}
              >
                <p className={"elementor-heading-title elementor-size-default"}>
                  {" "}
                  If you&apos;re a D2C founder in India or the GCC doing ₹30L+ per
                  month and ready to invest in compounding growth, we&apos;d love to
                  hear from you. Pick a time that suits you below.
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              "elementor-element elementor-element-ad4e821 e-flex e-con-boxed e-con e-parent"
            }
            data-id={"ad4e821"}
            data-element_type={"container"}
            data-e-type={"container"}
            id={"call"}
            data-settings={'{"background_background":"classic"}'}
          >
            <div className={"e-con-inner"}>
              <div
                className={
                  "elementor-element elementor-element-c7c4625 code elementor-widget elementor-widget-html"
                }
                data-id={"c7c4625"}
                data-element_type={"widget"}
                data-e-type={"widget"}
                data-widget_type={"html.default"}
              >
                <iframe
                  src={
                    "https://api.leadconnectorhq.com/widget/booking/Mu0clt9PrIjPQArBhQPA"
                  }
                  allow={"payment"}
                  style={{ width: "100%", border: "none", overflow: "hidden" }}
                  scrolling={"no"}
                  id={"Mu0clt9PrIjPQArBhQPA_1790310507307"}
                ></iframe>{" "}
                <br />{" "}
              </div>

              <div
                className={
                  "elementor-element elementor-element-5eacd0b code elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-html"
                }
                data-id={"5eacd0b"}
                data-element_type={"widget"}
                data-e-type={"widget"}
                data-widget_type={"html.default"}
              >
                <dayschedule-widget
                  url={"https://dare-network.dayschedule.com/dn-discovery-call"}
                  options={
                    '{\n      "color": {\n             "primary": "#C10331",\n             "secondary": "#AFEEFE"\n        }}'
                  }
                ></dayschedule-widget>
              </div>

              <div
                className={
                  "elementor-element elementor-element-21e30f3 elementor-widget elementor-widget-html"
                }
                data-id={"21e30f3"}
                data-element_type={"widget"}
                data-e-type={"widget"}
                data-widget_type={"html.default"}
              >
                <style>.space-y-2&#123; display: none; &#125;</style>{" "}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
