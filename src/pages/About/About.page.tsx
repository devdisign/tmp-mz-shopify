import type { FunctionComponent } from "preact";
import Typewriter from "typewriter-effect";

import { Container } from "./About.styles";

import TopRightImg from "@images/artwork-top-right.png";
import BottomLeftImg from "@images/artwork-bottom-left.png";
import GloryIsInGod from "@images/glory-is-in-god.svg";

import { withTemplate } from "@components/Layout";

import register from "@utils/custom-element";

interface AboutProps { }

const messages = [
  "Made in the mountains",
  "to reflect the highest glory",
  "to bring darkness into light",
  "turn Fear into a Feast",
  "Glory into Garment",
  "Glory is in God",
];

const bottomMessages = [
  "The word glory comes from the Hebrew word kabowd (kaw-bode’),",
  "and this words means “abundance.”",
  "When Moses travelled up the mountain to beg God to reveal to him His glory,",
  "he was asking God to experience his abundance.",

  "<br>Abundance is in God.",

  "<br>Intentionally designed garments to reflect Gods highest Glory.",

  "<br>MADE IN THE MOUNTAINS.",
  "BROUGHT TO THE ENDS",
  "Ghetto Sculpture",
  "INTENTIONALLY CRAFTED FOR THE OUTLIERS",
  "THOSE LIVING ON THE MARGINS",
  "NOT TO BE PUT IN BOXES UNLESS SHIPPED.",

  "<br>Created in LDN.",

  "<br>Designed by Angelo",
];

const About: FunctionComponent<AboutProps> = () => (
  <Container>
    <div className="text quote">
      <Typewriter
        options={{
          delay: 50,
        }}
        onInit={(typewriter) => {
          typewriter.pauseFor(500);
          messages.forEach((message, i) => {
            typewriter.typeString(message);
            typewriter.pauseFor(500);
            if (i < messages.length - 1) {
              typewriter.typeString("<br>");
            }
          });
          typewriter.start();
        }}
      />
    </div>
    <div className="artwork artwork-right">
      <div className="artwork-fade">
        <img src={TopRightImg} alt="" />
      </div>
    </div>
    <div className="artwork artwork-left">
      <div className="artwork-fade">
        <img src={BottomLeftImg} alt="" />
      </div>
    </div>
    <span className="logo-passage">
      <img className="logo" src={GloryIsInGod} alt="" />
      <div className="text passage">
        <Typewriter
          options={{ delay: 0 }}
          onInit={(typewriter) => {
            typewriter.pauseFor(500);
            bottomMessages.forEach((message, i) => {
              typewriter.typeString(message);
              typewriter.pauseFor(50);
              if (i < bottomMessages.length - 1) {
                typewriter.typeString("<br>");
              }
            });
            typewriter.start();
          }}
        />
      </div>
    </span>
  </Container>
);

const AboutWithTemplate = withTemplate(About);

register(AboutWithTemplate);
