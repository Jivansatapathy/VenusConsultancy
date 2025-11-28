// client/src/pages/PrivacyPolicy.jsx
import React from "react";
import "./LegalPages.css";

const PrivacyPolicy = () => {
  return (
    <main className="legal-page">
      <div className="legal-page__container">
        <div className="legal-page__header">
          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="legal-page__content">
          <section className="legal-section">
            <h2 className="legal-section__title">1. Introduction</h2>
            <p className="legal-section__text">
              Venus Hiring ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
            </p>
            <p className="legal-section__text">
              By using our website and services, you consent to the data practices described in this policy. If you do not agree with the practices described, please do not use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">2. Information We Collect</h2>
            <h3 className="legal-section__subtitle">2.1 Personal Information</h3>
            <p className="legal-section__text">
              We may collect personal information that you provide directly to us, including:
            </p>
            <ul className="legal-section__list">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Resume, work history, education, and professional qualifications</li>
              <li>Employment preferences, salary expectations, and career goals</li>
              <li>Company information (for employers and clients)</li>
              <li>Payment information (processed through secure third-party providers)</li>
            </ul>

            <h3 className="legal-section__subtitle">2.2 Automatically Collected Information</h3>
            <p className="legal-section__text">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="legal-section__list">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">3. How We Use Your Information</h2>
            <p className="legal-section__text">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="legal-section__list">
              <li>Providing, maintaining, and improving our recruitment and staffing services</li>
              <li>Matching job seekers with employment opportunities</li>
              <li>Processing job applications and managing candidate profiles</li>
              <li>Communicating with you about our services, job opportunities, and updates</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Analyzing website usage and trends to improve user experience</li>
              <li>Preventing fraud and ensuring security</li>
              <li>Complying with legal obligations and enforcing our terms</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">4. Information Sharing and Disclosure</h2>
            <p className="legal-section__text">
              We may share your information in the following circumstances:
            </p>
            <ul className="legal-section__list">
              <li><strong>With Employers:</strong> We share candidate information with potential employers and clients to facilitate job placements</li>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
              <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">5. Data Security</h2>
            <p className="legal-section__text">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">6. Your Rights and Choices</h2>
            <p className="legal-section__text">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="legal-section__list">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Objection to processing of your information</li>
              <li>Data portability</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="legal-section__text">
              To exercise these rights, please contact us at <a href="mailto:info@venushiring.com" className="legal-section__link">info@venushiring.com</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">7. Cookies and Tracking Technologies</h2>
            <p className="legal-section__text">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage, and assist with marketing efforts. You can control cookies through your browser settings, but disabling cookies may limit certain features of our website.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">8. Third-Party Links</h2>
            <p className="legal-section__text">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">9. Children's Privacy</h2>
            <p className="legal-section__text">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">10. International Data Transfers</h2>
            <p className="legal-section__text">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our services, you consent to such transfers.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">11. Changes to This Privacy Policy</h2>
            <p className="legal-section__text">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after changes become effective constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">12. Contact Us</h2>
            <p className="legal-section__text">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="legal-section__contact">
              <p><strong>Venus Hiring</strong></p>
              <p>880 W Long Lake Rd Ste 225</p>
              <p>Troy, MI 48098, USA</p>
              <p>Email: <a href="mailto:info@venushiring.com" className="legal-section__link">info@venushiring.com</a></p>
              <p>Phone: <a href="tel:248-275-1077" className="legal-section__link">248-275-1077</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;

