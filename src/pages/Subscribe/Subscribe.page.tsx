import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import Typewriter, { TypewriterClass } from "typewriter-effect";

import DogLeft from "@images/dog-left-facing.png";
import DogRight from "@images/dog-right-facing.png";
import BoyInitialFrame from "@images/boy-initial-frame.gif";
// import Boy from "@images/yute.png";
import Boy from "@images/yute.gif";
import GhettsItInGang from "@images/ghetts-it-in-gang.svg";

import { ContainerContent, BoyDiv } from "./Subscribe.styles";

import { withTemplate } from "@components/Layout";

import register from "@utils/custom-element";
import Form from "@components/Form";

interface SubscribeProps { }

const topBaseMessages = [
  "Wag1 <strong>family</strong>. Congratulations on getting the drop...",
  "Don’t Lack...",
];

const topMessages = [
  "Glory is in God",
  "Great increase is guaranteed",
  "Grind Invest invent grow",
  "Ghetts it in Gang",
  "Glory is in God!",
];

const bottomMessages = [
  "Made in the mountains",
  "To make a way through the wilderness",
  "Plant rivers in the desert",
  "Turn the furnace into fuel",
  "Fear into a Feast",
  "Glory into Garment",
  "",
  `The word glory comes from the Hebrew word kabowd (kaw-bode'), and roughly translates to "<em>abundance</em>".`,
  "<strong>Glory: Abundance.</strong>",
  `"Let all the nations be gathered together, and let the people be assembled: who among them can declare this, and demonstrate to us Gods Glory?"`,
];

const Subscribe: FunctionComponent<SubscribeProps> = () => {
  const [topTypewriter, setTopTypewriter] = useState<TypewriterClass>();
  const [bottomTypewriter, setBottomTypewriter] = useState<TypewriterClass>();

  useEffect(() => {
    if (topTypewriter === undefined || bottomTypewriter === undefined) {
      return;
    }
    topTypewriter.start();
    bottomTypewriter.start();
  }, [topTypewriter, bottomTypewriter]);

  return (
    <ContainerContent>
      <img src={DogLeft} className="artwork artwork-left" alt="dog" />
      <div className="stack">
        <div className="text-container">
          <Typewriter
            options={{
              // wrapperClassName: "text",
              delay: 50,
              deleteSpeed: 0,
            }}
            onInit={(typewriter) => {
              topBaseMessages.forEach(message => {
                typewriter.typeString(message);
                typewriter.pauseFor(50);
                typewriter.typeString("<br>");
              });
              topMessages.forEach((message, i, messages) => {
                if (i > 0) {
                  typewriter.deleteChars(messages[i - 1].length);
                }
                typewriter.typeString(message);
                typewriter.pauseFor(500);
              });
              setTopTypewriter(typewriter);
            }}
          />
        </div>
        <img className="artwork logo" src={GhettsItInGang} alt="giig text logo" />
        <Form type="signup" emailPlaceholder="email" />
      </div>
      <div className="passage text-container">
        <Typewriter
          options={{
            wrapperClassName: "text",
            delay: 50,
          }}
          onInit={(typewriter) => {
            bottomMessages.forEach((message, i, messages) => {
              typewriter.typeString(message);
              typewriter.pauseFor(50);
              if (i < messages.length - 1) {
                typewriter.typeString("<br>");
              }
            });
            setBottomTypewriter(typewriter);
          }}
        />
      </div>
      <BoyDiv className="boy">
        <img className="artwork animation-freeze-frame" src={BoyInitialFrame} alt="young boy" />
        <img className="artwork animation" src={Boy} alt="young boy" />
      </BoyDiv>
      <img className="artwork artwork-right" src={DogRight} alt="dog" />
    </ContainerContent>
  );
};

const SubscribeWithTemplate = withTemplate(Subscribe);

register(SubscribeWithTemplate);
