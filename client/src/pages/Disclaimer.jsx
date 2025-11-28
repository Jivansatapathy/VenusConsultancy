// client/src/pages/Disclaimer.jsx
import React from "react";
import "./LegalPages.css";

const Disclaimer = () => {
  return (
    <main className="legal-page">
      <div className="legal-page__container">
        <div className="legal-page__header">
          <h1 className="legal-page__title">Disclaimer</h1>
          <p className="legal-page__last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="legal-page__content">
          <section className="legal-section">
            <h2 className="legal-section__title">1. General Information</h2>
            <p className="legal-section__text">
              The information contained on the Venus Hiring website and provided through our services is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">2. No Employment Guarantee</h2>
            <p className="legal-section__text">
              Venus Hiring is a recruitment and staffing service provider. We do not guarantee:
            </p>
            <ul className="legal-section__list">
              <li>Job placement or employment for any job seeker</li>
              <li>That job seekers will be hired by any employer</li>
              <li>That employers will find suitable candidates</li>
              <li>Specific outcomes or results from using our services</li>
              <li>The duration, terms, or conditions of any employment</li>
            </ul>
            <p className="legal-section__text">
              Employment decisions are made solely by employers, and we are not responsible for hiring, termination, or employment-related decisions.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">3. Third-Party Content and Links</h2>
            <p className="legal-section__text">
              Our website may contain links to external websites, job postings from third-party employers, and content provided by users. We do not:
            </p>
            <ul className="legal-section__list">
              <li>Endorse or guarantee the accuracy of third-party content</li>
              <li>Control or monitor external websites</li>
              <li>Verify the legitimacy of all job postings or employers</li>
              <li>Assume responsibility for the content, privacy policies, or practices of third-party sites</li>
            </ul>
            <p className="legal-section__text">
              Users are advised to exercise caution and conduct their own due diligence when interacting with third parties or external websites.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">4. Candidate and Employer Information</h2>
            <p className="legal-section__text">
              While we take reasonable steps to verify information, we cannot guarantee:
            </p>
            <ul className="legal-section__list">
              <li>The accuracy of candidate resumes, qualifications, or credentials</li>
              <li>The authenticity of employer information or job postings</li>
              <li>The completeness of background checks or references</li>
              <li>The current employment status of candidates</li>
            </ul>
            <p className="legal-section__text">
              Employers and job seekers are responsible for verifying information independently before making hiring or employment decisions.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">5. Service Availability and Interruptions</h2>
            <p className="legal-section__text">
              We strive to maintain continuous availability of our services but do not guarantee:
            </p>
            <ul className="legal-section__list">
              <li>Uninterrupted or error-free service</li>
              <li>That our website will be available at all times</li>
              <li>That errors will be corrected immediately</li>
              <li>That our services will meet all user requirements</li>
            </ul>
            <p className="legal-section__text">
              We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">6. Professional Advice</h2>
            <p className="legal-section__text">
              The information provided through our services does not constitute:
            </p>
            <ul className="legal-section__list">
              <li>Legal advice</li>
              <li>Financial advice</li>
              <li>Tax advice</li>
              <li>Professional career counseling</li>
              <li>Employment law guidance</li>
            </ul>
            <p className="legal-section__text">
              Users should consult with qualified professionals for advice on legal, financial, tax, or employment matters.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">7. Limitation of Liability</h2>
            <p className="legal-section__text">
              To the fullest extent permitted by applicable law, Venus Hiring, its officers, directors, employees, agents, and affiliates shall not be liable for:
            </p>
            <ul className="legal-section__list">
              <li>Any direct, indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Employment-related disputes or issues</li>
              <li>Decisions made based on information provided through our services</li>
              <li>Actions or omissions of third parties, including employers and job seekers</li>
              <li>Security breaches or unauthorized access to user information</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">8. No Warranties</h2>
            <p className="legal-section__text">
              Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:
            </p>
            <ul className="legal-section__list">
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy or completeness of information</li>
              <li>Uninterrupted or error-free operation</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">9. User Responsibility</h2>
            <p className="legal-section__text">
              Users are solely responsible for:
            </p>
            <ul className="legal-section__list">
              <li>The accuracy and truthfulness of information they provide</li>
              <li>Their use of our services and compliance with applicable laws</li>
              <li>Decisions made based on information obtained through our platform</li>
              <li>Interactions with employers, job seekers, or third parties</li>
              <li>Protecting their account credentials and personal information</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">10. Changes to Services</h2>
            <p className="legal-section__text">
              We reserve the right to modify, update, or discontinue any aspect of our services at any time without prior notice. We are not obligated to update information or notify users of changes.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">11. Jurisdiction and Applicable Law</h2>
            <p className="legal-section__text">
              This disclaimer is governed by the laws of the State of Michigan, United States. Any disputes arising from or related to this disclaimer or our services shall be subject to the exclusive jurisdiction of the courts in Michigan.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section__title">12. Contact Information</h2>
            <p className="legal-section__text">
              If you have questions about this Disclaimer, please contact us:
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

export default Disclaimer;

