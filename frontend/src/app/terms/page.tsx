import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | DG-online",
  description:
    "Terms and Conditions for the DG-online dangerous goods training platform.",
};

export default function TermsPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 prose prose-slate max-w-none [&_h1]:text-3xl [&_h1]:md:text-[42px] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-text-dark [&_h1]:mb-8 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-text-dark [&_h3]:mt-10 [&_h3]:mb-3 [&_p]:text-text-muted [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-[15px] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:mb-4 [&_li]:text-text-muted [&_li]:text-[15px] [&_li]:leading-relaxed [&_a]:text-link [&_a]:underline hover:[&_a]:text-brand-dark">
      <h1>Terms and Conditions</h1>

      <p>
        This agreement applies as between you, the User of this Website and
        DLD-S, the owner(s) of this Website. Your agreement to comply with and
        be bound by Clauses 1, 2, 4 – 11 and 15 – 25 of these Terms and
        Conditions is deemed to occur upon your first use of the Website.
        Clauses 3 and 12 – 14 apply only to the sale of Services. If you do not
        agree to be bound by these Terms and Conditions, you should stop using
        the Website immediately.
      </p>
      <p>
        No part of this Website is intended to constitute a contractual offer
        capable of acceptance. Your order constitutes a contractual offer and Our
        acceptance of that offer is deemed to occur upon Our sending a
        confirmation email to you indicating that your order has been accepted.
      </p>

      <h3>1. Definitions and Interpretation</h3>
      <p>
        In this Agreement the following terms shall have the following meanings:
      </p>
      <p>
        <strong>&quot;Account&quot;</strong>: means collectively the personal
        information, Payment Information and credentials used by Users to access
        Paid Content and / or any communications System on the Website;
      </p>
      <p>
        <strong>&quot;Content&quot;</strong>: means any text, graphics, images,
        audio, video, software, data compilations and any other form of
        information capable of being stored in a computer that appears on or
        forms part of this Website;
      </p>
      <p>
        <strong>&quot;Facilities&quot;</strong>: means collectively any online
        facilities, tools, services or information that DLD-S makes available
        through the Website either now or in the future;
      </p>
      <p>
        <strong>&quot;Services&quot;</strong>: means the services available to you
        through this Website, specifically use of the DLD-S proprietary
        e-learning platform;
      </p>
      <p>
        <strong>&quot;Payment Information&quot;</strong>: means any details
        required for the purchase of Services from this Website. This includes,
        but is not limited to, credit / debit card numbers, bank account numbers
        and sort codes;
      </p>
      <p>
        <strong>&quot;Premises&quot;</strong>: Means Our place(s) of business;
      </p>
      <p>
        <strong>&quot;System&quot;</strong>: means any online communications
        infrastructure that DLD-S makes available through the Website either now
        or in the future. This includes, but is not limited to, web-based email,
        message boards, live chat facilities and email links;
      </p>
      <p>
        <strong>&quot;User&quot; / &quot;Users&quot;</strong>: means any third
        party that accesses the Website and is not employed by DLD-S Ltd and
        acting in the course of their employment;
      </p>
      <p>
        <strong>&quot;Website&quot;</strong>: means the website that you are
        currently using (dangerousgoods.online) and any sub-domains of this site
        unless expressly excluded by their own terms and conditions; and
      </p>
      <p>
        <strong>&quot;We/Us/Our&quot;</strong>: means DLD-S.
      </p>

      <h3>2. Age Restrictions</h3>
      <p>
        Persons under the age of 18 should use this Website only with the
        supervision of an Adult. Payment Information must be provided by or with
        the permission of an Adult.
      </p>

      <h3>3. Business Customers</h3>
      <p>
        These Terms and Conditions also apply to customers procuring Services in
        the course of business.
      </p>

      <h3>4. Intellectual Property</h3>
      <ul>
        <li>
          4.1 Subject to the exceptions in Clause 5 of these Terms and
          Conditions, all Content included on the Website, unless uploaded by
          Users, including, but not limited to, text, graphics, logos, icons,
          images, sound clips, video clips, data compilations, page layout,
          underlying code and software is the property of DLD-S, our affiliates
          or other relevant third parties. By continuing to use the Website you
          acknowledge that such material is protected by applicable intellectual
          property and other laws.
        </li>
        <li>
          4.2 Subject to Clause 6 you may not reproduce, copy, distribute, store
          or in any other fashion re-use material from the Website unless
          otherwise indicated on the Website or unless given Our express written
          permission to do so.
        </li>
      </ul>

      <h3>5. Third Party Intellectual Property</h3>
      <ul>
        <li>
          5.1 Unless otherwise expressly indicated, all Intellectual Property
          rights including, but not limited to, Copyright and Trademarks, in
          product images and descriptions belong to the manufacturers or
          distributors of such products as may be applicable.
        </li>
        <li>
          5.2 Subject to Clause 6 you may not reproduce, copy, distribute, store
          or in any other fashion re-use such material unless otherwise indicated
          on the Website or unless given express written permission to do so by
          the relevant manufacturer or supplier.
        </li>
      </ul>

      <h3>6. Fair Use of Intellectual Property</h3>
      <p>
        Material from the Website may be re-used without written permission where
        any of the exceptions detailed in Chapter III of the Copyright Designs
        and Patents Act 1988 apply.
      </p>

      <h3>7. Links to Other Websites</h3>
      <p>
        This Website may contain links to other sites. Unless expressly stated,
        these sites are not under the control of DLD-S or that of Our affiliates.
        We assume no responsibility for the content of such websites and disclaim
        liability for any and all forms of loss or damage arising out of the use
        of them. The inclusion of a link to another site on this Website does not
        imply any endorsement of the sites themselves or of those in control of
        them.
      </p>

      <h3>8. Links to this Website</h3>
      <p>
        Those wishing to place a link to this Website on other sites may do so
        only to the home page of the site dangerousgoods.online without Our prior
        permission. Deep linking (i.e. links to specific pages within the site)
        requires Our express written permission. To find out more please contact
        Us by email at{" "}
        <a href="mailto:info@dldands.com">info@dldands.com</a>.
      </p>

      <h3>9. Use of Communications Facilities</h3>
      <ul>
        <li>
          9.1 When using any System on the Website you should do so in accordance
          with the following rules. Failure to comply with these rules may result
          in your Account being suspended or closed:
          <ul className="mt-2">
            <li>9.1.1 You must not use obscene or vulgar language;</li>
            <li>
              9.1.2 You must not submit Content that is unlawful or otherwise
              objectionable. This includes, but is not limited to, Content that
              is abusive, threatening, harassing, defamatory, ageist, sexist or
              racist;
            </li>
            <li>
              9.1.3 You must not submit Content that is intended to promote or
              incite violence;
            </li>
            <li>
              9.1.4 It is advised that submissions are made using the English
              language as We may be unable to respond to enquiries submitted in
              any other languages;
            </li>
            <li>
              9.1.5 The means by which you identify yourself must not violate
              these Terms and Conditions or any applicable laws;
            </li>
            <li>
              9.1.6 You must not impersonate other people, particularly employees
              and representatives of DLD-S or Our affiliates; and
            </li>
            <li>
              9.1.7 You must not use Our System for unauthorised
              mass-communication such as &quot;spam&quot; or &quot;junk
              mail&quot;.
            </li>
          </ul>
        </li>
        <li>
          9.2 You acknowledge that DLD-S reserves the right to monitor any and
          all communications made to Us or using Our System.
        </li>
        <li>
          9.3 You acknowledge that DLD-S may retain copies of any and all
          communications made to Us or using Our System.
        </li>
        <li>
          9.4 You acknowledge that any information you send to Us through Our
          System may be modified by Us in any way and you hereby waive your moral
          right to be identified as the author of such information. Any
          restrictions you may wish to place upon Our use of such information
          must be communicated to Us in advance and We reserve the right to
          reject such terms and associated information.
        </li>
      </ul>

      <h3>10. Accounts</h3>
      <ul>
        <li>
          10.1 In order to procure Services on this Website and to use certain
          other parts of the System, you are required to create an Account which
          will contain certain personal details and Payment Information which may
          vary based upon your use of the Website as We may not require payment
          information until you wish to make a purchase. By continuing to use
          this Website you represent and warrant that:
          <ul className="mt-2">
            <li>
              10.1.1 all information you submit is accurate and truthful;
            </li>
            <li>
              10.1.2 you have permission to submit Payment Information where
              permission may be required; and
            </li>
            <li>
              10.1.3 you will keep this information accurate and up-to-date.
            </li>
          </ul>
        </li>
        <li>
          10.2 It is recommended that you do not share your Account details,
          particularly your username and password. We accept no liability for any
          losses or damages incurred as a result of your Account details being
          shared by you. If you use a shared computer, it is recommended that you
          do not save your Account details in your internet browser.
        </li>
        <li>
          10.3 If you have reason to believe that your Account details have been
          obtained by another person without consent, you should contact Us
          immediately to suspend your Account and cancel any unauthorised orders
          or payments that may be pending.
        </li>
        <li>
          10.4 When choosing your username you are required to adhere to the
          terms set out above in Clause 9. Any failure to do so could result in
          the suspension and/or deletion of your Account.
        </li>
      </ul>

      <h3>11. Termination and Cancellation of Accounts</h3>
      <ul>
        <li>
          11.1 Either DLD-S or you may terminate your Account. If We terminate
          your Account, you will be notified by email and an explanation for the
          termination will be provided. Notwithstanding the foregoing, We reserve
          the right to terminate without giving reasons.
        </li>
        <li>
          11.2 If We terminate your Account, any current or pending orders or
          payments on your Account will be cancelled and provision of Services
          will not commence.
        </li>
      </ul>

      <h3>12. Services, Pricing and Availability</h3>
      <ul>
        <li>
          12.1 Whilst every effort has been made to ensure that all general
          descriptions of Services available from DLD-S correspond to the actual
          Services that will be provided to you, We are not responsible for any
          variations from these descriptions as the exact nature of the Services
          may vary depending on your individual requirements and circumstances.
        </li>
        <li>
          12.2 Where appropriate, you may be required to select the required Plan
          of Services.
        </li>
        <li>
          12.3 We neither represent nor warrant that such Services will be
          available at all times and cannot necessarily confirm availability until
          confirming your Order.
        </li>
        <li>
          12.4 All pricing information on the Website is correct at the time of
          going online. We reserve the right to change prices and alter or remove
          any special offers from time to time and as necessary.
        </li>
        <li>
          12.5 In the event that prices are changed during the period between an
          order being placed for Services and Us processing that order and taking
          payment, then the price that was valid at the time of the order shall
          be used.
        </li>
      </ul>

      <h3>13. Orders and Provision of Services</h3>
      <ul>
        <li>
          13.1 No part of this Website constitutes a contractual offer capable of
          acceptance. Your order constitutes a contractual offer that We may, at
          Our sole discretion, accept. Our acceptance is indicated by Us sending
          to you an order confirmation email.
        </li>
        <li>
          13.2 Order confirmations will contain:
          <ul className="mt-2">
            <li>
              13.2.1 Confirmation of the Services ordered including full details
              of the main characteristics;
            </li>
            <li>
              13.2.2 Fully itemised pricing for the Services ordered including,
              where appropriate, taxes, delivery and other additional charges;
            </li>
            <li>
              13.2.3 Relevant times and dates for the provision of the Services;
            </li>
            <li>
              13.2.4 User credentials and relevant information for accessing
              those services.
            </li>
          </ul>
        </li>
        <li>
          13.3 If We, for any reason, do not accept your order, no payment shall
          be taken under normal circumstances. In any event, any sums paid by you
          in relation to that order will be refunded within 14 calendar days.
        </li>
        <li>
          13.4 Payment for the Services shall be taken via your chosen payment
          method, immediately for any setup fee that corresponds to the service
          plan you purchased and at the same day of each subsequent month for
          charges accrued during the previous billing cycle.
        </li>
        <li>
          13.5 We aim to fulfill your Order within 2-3 working days or if not,
          within a reasonable period following your Order, unless there are
          exceptional circumstances.
        </li>
        <li>
          13.6 DLD-S shall use all Our reasonable endeavours to provide the
          Services with reasonable skill and care, commensurate with best trade
          practice.
        </li>
        <li>
          13.7 In the event that Services are provided that are not in conformity
          with your order and thus incorrect, you should contact Us immediately
          to inform Us of the mistake. We will ensure that any necessary
          corrections are made within five (5) working days.
        </li>
        <li>
          13.8 DLD-S provides technical support via our online support forum
          and/or phone. DLD-S makes every effort possible to respond in a timely
          manner but we do not guarantee a particular response time.
        </li>
      </ul>

      <h3>14. Cancellation of Orders and Services</h3>
      <p>
        We want you to be completely satisfied with the Products or Services you
        order from DLD-S. If you need to speak to us about your Order, then
        please contact customer care by email at{" "}
        <a href="mailto:info@dldands.com">info@dldands.com</a>. You may cancel
        an Order that we have accepted or cancel the Contract.
      </p>
      <ul>
        <li>
          14.1 If you are a consumer based within the European Union, you have a
          statutory right to a &quot;cooling off&quot; period. This period begins
          once your order is confirmed and the contract between DLD-S and you is
          formed and ends at the end of 14 calendar days after that date.
        </li>
        <li>
          14.2 If the Services are to begin within the cooling off period you are
          required to make an express request to that effect. By requesting that
          the Services begin within the 14 calendar day cooling off period you
          acknowledge and agree to the following:
          <ul className="mt-2">
            <li>
              14.2.1 If the Services are fully performed within the 14 calendar
              day cooling off period, you will lose your right to cancel after
              the Services are complete.
            </li>
            <li>
              14.2.2 If you cancel the Services after provision has begun but is
              not yet complete you will still be required to pay for the Services
              supplied up until the point at which you inform Us that you wish to
              cancel.
            </li>
          </ul>
        </li>
        <li>
          14.3 Cancellation of Services after the 14 calendar day cooling off
          period has elapsed shall be subject to the specific terms governing
          those Services and may be subject to a minimum contract duration.
        </li>
      </ul>

      <h3>15. Privacy</h3>
      <p>
        Use of the Website is also governed by Our{" "}
        <Link href="/privacy">Privacy Policy</Link> which is incorporated into
        these Terms and Conditions by this reference.
      </p>

      <h3>16. How We Use Your Personal Information (Data Protection)</h3>
      <ul>
        <li>
          16.1 All personal information that We may collect (including, but not
          limited to, your name and address) will be collected, used and held in
          accordance with the provisions of the Data Protection Act 1998 and your
          rights under that Act.
        </li>
        <li>
          16.2 We may use your personal information to:
          <ul className="mt-2">
            <li>16.2.1 Provide Our Services to you;</li>
            <li>16.2.2 Process your payment for the Services; and</li>
            <li>
              16.2.3 Inform you of new products and services available from Us.
              You may request that We stop sending you this information at any
              time.
            </li>
          </ul>
        </li>
        <li>
          16.3 In certain circumstances (if, for example, you wish to purchase
          Services on credit), and with your consent, We may pass your personal
          information on to credit reference agencies. These agencies are also
          bound by the Data Protection Act 1998.
        </li>
        <li>
          16.4 We will not pass on your personal information to any other third
          parties without first obtaining your express permission.
        </li>
      </ul>

      <h3>17. Disclaimers</h3>
      <ul>
        <li>
          17.1 We make no warranty or representation that the Website will meet
          your requirements, that it will be of satisfactory quality, that it
          will be fit for a particular purpose, that it will not infringe the
          rights of third parties, that it will be compatible with all systems,
          that it will be secure and that all information provided will be
          accurate. We make no guarantee of any specific results from the use of
          our Service or Services.
        </li>
        <li>
          17.2 No part of this Website is intended to constitute advice and the
          Content of this Website should not be relied upon when making any
          decisions or taking any action of any kind.
        </li>
        <li>
          17.3 No part of this Website is intended to constitute a contractual
          offer capable of acceptance.
        </li>
        <li>
          17.4 Whilst We use reasonable endeavours to ensure that the Website is
          secure and free of errors, viruses and other malware, you are strongly
          advised to take responsibility for your own internet security, that of
          your personal details and your computers.
        </li>
      </ul>

      <h3>18. Changes to the Facilities and these Terms and Conditions</h3>
      <p>
        We reserve the right to change the Website, its Content or these Terms
        and Conditions at any time. You will be bound by any changes to the Terms
        and Conditions from the first time you use the Website following the
        changes.
      </p>

      <h3>19. Availability of the Website</h3>
      <ul>
        <li>
          19.1 The Website is provided &quot;as is&quot; and on an &quot;as
          available&quot; basis. DLD-S uses industry best practices to provide a
          high uptime, including a fault-tolerant architecture hosted in cloud
          servers. We give no warranty that the Website or Facilities will be
          free of defects and / or faults and we do not provide any kind of
          refund for outages.
        </li>
        <li>
          19.2 We accept no liability for any disruption or non-availability of
          the Website resulting from external causes including, but not limited
          to, ISP equipment failure, host equipment failure, communications
          network failure, power failure, natural events, acts of war or legal
          restrictions and censorship.
        </li>
      </ul>

      <h3>20. Limitation of Liability</h3>
      <ul>
        <li>
          20.1 To the maximum extent permitted by law, We accept no liability for
          any direct or indirect loss or damage, foreseeable or otherwise,
          including any indirect, consequential, special or exemplary damages
          arising from the use of the Website or any information contained
          therein. You should be aware that you use the Website and its Content
          at your own risk.
        </li>
        <li>
          20.3 Nothing in these Terms and Conditions excludes or restricts
          DLD-S&apos;s liability for any direct or indirect loss or damage
          arising out of the incorrect provision of Services or out of reliance
          on incorrect information included on the Website.
        </li>
        <li>
          20.4 In the event that any of these terms are found to be unlawful,
          invalid or otherwise unenforceable, that term is to be deemed severed
          from these Terms and Conditions and shall not affect the validity and
          enforceability of the remaining Terms and Conditions.
        </li>
      </ul>

      <h3>21. No Waiver</h3>
      <p>
        In the event that any party to these Terms and Conditions fails to
        exercise any right or remedy contained herein, this shall not be
        construed as a waiver of that right or remedy.
      </p>

      <h3>22. Previous Terms and Conditions</h3>
      <p>
        In the event of any conflict between these Terms and Conditions and any
        prior versions thereof, the provisions of these Terms and Conditions
        shall prevail unless it is expressly stated otherwise.
      </p>

      <h3>23. Third Party Rights</h3>
      <p>
        Nothing in these Terms and Conditions shall confer any rights upon any
        third party. The agreement created by these Terms and Conditions is
        between you and DLD-S.
      </p>

      <h3>24. Communications</h3>
      <ul>
        <li>
          24.1 All notices / communications shall be given to Us either by post
          to Our Premises or by email to{" "}
          <a href="mailto:info@dldands.com">info@dldands.com</a>. Such notice
          will be deemed received 3 days after posting if sent by first class
          post, the day of sending if the email is received in full on a business
          day and on the next business day if the email is sent on a weekend or
          public holiday.
        </li>
        <li>
          24.2 We may from time to time, if you opt to receive it, send you
          information about Our products and/or services. If you do not wish to
          receive such information, please click on the &quot;Unsubscribe&quot;
          link in any email which you receive from Us.
        </li>
      </ul>

      <h3>25. Law and Jurisdiction</h3>
      <p>
        These Terms and Conditions and the relationship between you and DLD-S
        shall be governed by and construed in accordance with the Law of England
        and Wales and DLD-S and you agree to submit to the exclusive jurisdiction
        of the Courts of England and Wales.
      </p>
    </article>
  );
}
