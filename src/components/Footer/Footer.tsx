import type { FunctionComponent } from "preact";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaSnapchatGhost, FaTiktok, FaTumblr, FaTwitter, FaVimeoV, FaYoutube } from "react-icons/fa";

import { LinkData } from "@utils/types/shopify";

import { StyledFooter, FooterList } from "./Footer.styles";
import { useMemo } from "preact/hooks";

interface Payment {
  title: string,
  data: string,
}

export interface FooterProps {
  payments: Payment[],
  policies: readonly LinkData[],
  socials: readonly LinkData[],
}

const order_payments = (payments: Payment[]) => {
  const start = new Set([
    "visa",
    "master",
    "american_express",
    "diners_club",
    "discover",
    "maestro",
  ]);
  // excess icons
  const end = new Set([
    "shopify_pay",
    "apple_pay",
    "google_pay",
    "paypal",
  ]);

  const paymentsObj: { [title: string]: string } = payments.reduce(
    (acc, payment) => ({ ...acc, [payment.title]: payment.data }),
    {}
  );

  const excess = payments.filter(({ title }) => !start.has(title) && !end.has(title));

  const toPayments = (paymentTitles: string[]) => paymentTitles.map(title => ({ title, data: paymentsObj[title] } as Payment));

  return [
    ...toPayments(Array.from(start)),
    ...excess,
    ...toPayments(Array.from(end)),
  ];
};

const SOCIAL_ICONS: Record<string, JSX.Element> = Object.freeze({
  facebook: <FaFacebookF aria-label="facebook" />,
  twitter: <FaTwitter aria-label="twitter" />,
  instagram: <FaInstagram aria-label="instagram" />,
  snapchat: <FaSnapchatGhost aria-label="snapchat" />,
  tiktok: <FaTiktok aria-label="tiktok" />,
  youtube: <FaYoutube aria-label="youtube" />,
  pinterest: <FaPinterestP aria-label="pinterest" />,
  tumblr: <FaTumblr aria-label="tumblr" />,
  vimeo: <FaVimeoV aria-label="vimeo" />,
  linkedin: <FaLinkedinIn aria-label="linkedin" />,
});

const Footer: FunctionComponent<FooterProps> = ({ payments, policies, socials }) => {
  const payments_ordered = useMemo(() => order_payments(payments), [payments]);

  return (
    <StyledFooter className="footer">
      <div className="footer__links">
        <nav aria-label="policies">
          <FooterList>
            {policies.map(policy => (
              <li key={policy.title}><a href={policy.url}>{policy.title}</a></li>
            ))}
          </FooterList>
        </nav>
        <FooterList aria-label="social links">
          {socials.map(social => (
            (social.title in SOCIAL_ICONS) && (
              <li key={social.title}>
                <a href={social.url} rel="noreferrer" target="_blank">
                  {SOCIAL_ICONS[social.title]}
                </a>
              </li>
            )))
          }
        </FooterList>
      </div>
      <div className="footer__details">
        <ul className="footer__payments">
          {payments_ordered.map((payment, i) => <li key={i} dangerouslySetInnerHTML={{ __html: payment.data }} />)}
        </ul>
        <p className="footer__copyright">
          &copy; {(new Date()).getFullYear()} | GIIG LLC | All Rights Reserved | Glory is in God
        </p>
      </div>
    </StyledFooter>
  );
};

export default Footer;
