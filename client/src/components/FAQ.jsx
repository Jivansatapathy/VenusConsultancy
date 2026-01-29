// client/src/components/FAQ.jsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      question: "What types of staffing models does Venus Hiring offer?",
      answer: "Venus Hiring offers permanent staffing, contract and temporary hiring, executive search, project-based hiring, and talent consulting services tailored to business needs."
    },
    {
      question: "How does Venus Hiring ensure candidate quality?",
      answer: "We use a structured recruitment process that includes role analysis, skill-based screening, interviews, and background verification to ensure candidates meet technical and cultural requirements."
    },
    {
      question: "Can Venus Hiring support urgent or high-volume hiring needs?",
      answer: "Yes, we specialize in fast-turnaround and high-volume hiring projects by leveraging pre-vetted talent pools and industry-specific recruiters."
    },
    {
      question: "Do you provide industry-specific recruitment solutions?",
      answer: "Yes, our recruiters specialize in specific industries such as IT, healthcare, life sciences, manufacturing, aerospace, and finance to ensure domain expertise."
    },
    {
      question: "How does Venus Hiring handle compliance and hiring regulations?",
      answer: "We follow industry and regional hiring compliance standards to ensure ethical, secure, and legally compliant recruitment processes."
    },
    {
      question: "Can Venus Hiring customize recruitment solutions for my business?",
      answer: "Absolutely. Our recruitment strategies are customized based on company size, industry, hiring goals, and workforce requirements."
    },
    {
      question: "What services does Venus Consultancy offer?",
      answer: "Venus Consultancy provides comprehensive recruitment and talent solutions including IT recruitment, engineering placements, skilled trades, executive search, recruitment process outsourcing (RPO), and end-to-end talent acquisition services across various industries."
    },
    {
      question: "How do I apply for a job?",
      answer: "You can browse available positions on our Find Jobs page, use the search and filter options to find roles that match your skills, and click 'Apply Now' on any job listing. You'll need to provide your contact information, upload your resume, and optionally include a cover message."
    },
    {
      question: "What industries do you recruit for?",
      answer: "We specialize in IT, Engineering, Scientific Research, Skilled Trades, Light Industrial, Office & Clerical, Technical Support, and Executive/Board-level positions. We serve clients across multiple sectors including technology, manufacturing, finance, healthcare, and more."
    },
    {
      question: "How long does the recruitment process take?",
      answer: "The timeline varies depending on the role and client requirements. Typically, initial screening takes 1-2 business days, followed by client review and interviews. The entire process from application to job offer can range from 1-4 weeks, depending on the position level and urgency."
    },
    {
      question: "Do you charge candidates any fees?",
      answer: "No, our services are completely free for job seekers. All recruitment fees are paid by the hiring companies. We never charge candidates for job placement, resume reviews, or career counseling services."
    },
    {
      question: "What should I include in my resume?",
      answer: "Your resume should include: contact information, professional summary, work experience with dates and responsibilities, education and certifications, relevant skills, and any notable achievements. Keep it concise (1-2 pages) and tailored to the position you're applying for."
    },
    {
      question: "How can employers post job openings?",
      answer: "Employers can contact us through our Contact page or Hiring page to discuss their recruitment needs. We offer various packages including single position hiring, bulk recruitment, and RPO services. You can also reach out via WhatsApp or email to speak with our recruitment team."
    },
    {
      question: "What makes Venus Consultancy different from other recruitment agencies?",
      answer: "We combine human-centered approach with data-driven insights, ensuring both technical fit and cultural alignment. Our team has extensive experience across multiple industries, and we maintain strong relationships with both candidates and employers. We also provide comprehensive support throughout the entire hiring process."
    },
    {
      question: "Do you help with visa sponsorship or international placements?",
      answer: "Yes, we assist with international placements and can guide candidates through visa sponsorship processes when working with employers who offer such opportunities. We work with clients across the USA, Canada, and other international markets."
    },
    {
      question: "How do I prepare for an interview?",
      answer: "Research the company and role thoroughly, prepare examples of your achievements using the STAR method (Situation, Task, Action, Result), prepare thoughtful questions to ask the interviewer, dress professionally, and arrive on time (or log in early for virtual interviews). Our team can also provide interview preparation tips upon request."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 7);

  return (
    <section className="faq-section" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Find answers to common questions about our services, job applications, and recruitment process
          </p>
        </div>

        <div className="faq-list">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'faq-item--open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="faq-question-text">{faq.question}</span>
                <ChevronDown
                  className={`faq-icon ${openIndex === index ? 'faq-icon--open' : ''}`}
                  size={20}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`faq-answer ${openIndex === index ? 'faq-answer--open' : ''}`}
                aria-hidden={openIndex !== index}
              >
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-actions">
          <button
            className="faq-see-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

