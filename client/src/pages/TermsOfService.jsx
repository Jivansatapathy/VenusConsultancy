// client/src/pages/TermsOfService.jsx
import React from "react";
import "./LegalPages.css";

const TermsOfService = () => {
  return (
    <main className="legal-page">
      <div className="legal-page__container">
        <div className="legal-page__header">
          <h1 className="legal-page__title">Terms of Service</h1>
          <p className="legal-page__last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="legal-page__content">
          <section className="legal-section">
            <h2 className="legal-section__title">1. Acceptance of Terms</h2>
            <p className="legal-section__text">
              By accessing and using the Venus Hiring website and services, you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use our services.
            </p>
            <p className="legal-section__text">
              We reserve the right to modify these Terms at any time. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">2. Description of Services</h2>
            <p className="legal-section__text">
              Venus Hiring provides recruitment, staffing, and talent acquisition services. We connect job seekers with employment opportunities and assist employers in finding qualified candidates. Our services include but are not limited to:
            </p>
            <ul className="legal-section__list">
              <li>Job posting and candidate matching</li>
              <li>Resume and profile management</li>
              <li>Recruitment process outsourcing (RPO)</li>
              <li>Temporary and permanent staffing solutions</li>
              <li>Executive search and placement services</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">3. User Accounts and Registration</h2>
            <h3 className="legal-section__subtitle">3.1 Account Creation</h3>
            <p className="legal-section__text">
              To use certain features of our services, you may be required to create an account. You agree to:
            </p>
            <ul className="legal-section__list">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="legal-section__subtitle">3.2 Account Termination</h3>
            <p className="legal-section__text">
              We reserve the right to suspend or terminate your account at any time, with or without notice, for violation of these Terms or for any other reason we deem necessary.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">4. User Conduct and Responsibilities</h2>
            <p className="legal-section__text">
              You agree not to:
            </p>
            <ul className="legal-section__list">
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Provide false, misleading, or fraudulent information</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Attempt to gain unauthorized access to any part of our services</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Harvest or collect information about other users</li>
              <li>Use automated systems to access our services without permission</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">5. Job Seekers</h2>
            <h3 className="legal-section__subtitle">5.1 Profile and Resume</h3>
            <p className="legal-section__text">
              Job seekers are responsible for the accuracy and completeness of their profiles and resumes. You represent that all information provided is truthful and that you have the legal right to work in the positions for which you apply.
            </p>

            <h3 className="legal-section__subtitle">5.2 Job Applications</h3>
            <p className="legal-section__text">
              By applying for positions through our platform, you consent to us sharing your information with potential employers. We do not guarantee job placement or employment.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">6. Employers and Clients</h2>
            <h3 className="legal-section__subtitle">6.1 Job Postings</h3>
            <p className="legal-section__text">
              Employers are responsible for the accuracy of job postings and compliance with applicable employment laws. You agree to:
            </p>
            <ul className="legal-section__list">
              <li>Post only legitimate job opportunities</li>
              <li>Comply with equal opportunity employment laws</li>
              <li>Respond to candidates in a professional and timely manner</li>
              <li>Honor all commitments made to candidates</li>
            </ul>

            <h3 className="legal-section__subtitle">6.2 Candidate Information</h3>
            <p className="legal-section__text">
              Information provided about candidates is confidential and should be used solely for recruitment purposes. You agree not to share candidate information with third parties without consent.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">7. Fees and Payment</h2>
            <p className="legal-section__text">
              Some services may require payment. All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing at any time. Payment terms will be specified in separate agreements for fee-based services.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">8. Intellectual Property</h2>
            <p className="legal-section__text">
              All content on our website, including text, graphics, logos, images, and software, is the property of Venus Hiring or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">9. Disclaimers and Limitations of Liability</h2>
            <h3 className="legal-section__subtitle">9.1 Service Availability</h3>
            <p className="legal-section__text">
              We strive to provide reliable services but do not guarantee uninterrupted or error-free operation. Our services are provided "as is" and "as available" without warranties of any kind.
            </p>

            <h3 className="legal-section__subtitle">9.2 No Guarantee of Employment</h3>
            <p className="legal-section__text">
              We do not guarantee job placement, employment, or specific outcomes. We are not responsible for the hiring decisions of employers or the employment decisions of job seekers.
            </p>

            <h3 className="legal-section__subtitle">9.3 Limitation of Liability</h3>
            <p className="legal-section__text">
              To the maximum extent permitted by law, Venus Hiring shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">10. Indemnification</h2>
            <p className="legal-section__text">
              You agree to indemnify, defend, and hold harmless Venus Hiring and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services or violation of these Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">11. Termination</h2>
            <p className="legal-section__text">
              We may terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms. Upon termination, your right to use our services will cease immediately.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">12. Governing Law and Dispute Resolution</h2>
            <p className="legal-section__text">
              These Terms shall be governed by and construed in accordance with the laws of the State of Michigan, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">13. Severability</h2>
            <p className="legal-section__text">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">14. Contact Information</h2>
            <p className="legal-section__text">
              If you have questions about these Terms of Service, please contact us:
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

export default TermsOfService;

