import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const PriceCard = ({ title, price, features, recommended, contactSales }) => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={slideIn('up', 'tween', 0.2, 1)}
      className={`bg-black-100 p-3 xs:p-4 sm:p-6 rounded-2xl w-[300px] xs:w-[340px] sm:w-[360px] ${
        recommended ? 'border-2 border-white' : ''
      }`}
    >
      <h3 className="text-white font-bold text-[16px] xs:text-[18px] sm:text-[24px]">
        {title}
      </h3>
      <p className="text-secondary text-[20px] xs:text-[24px] sm:text-[36px] font-bold mt-1 xs:mt-2">
        {contactSales ? 'Custom' : `$${price}`}
      </p>
      <ul className="mt-2 xs:mt-3 sm:mt-4 space-y-1 xs:space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-white-100 text-[12px] xs:text-[13px] sm:text-[16px]">
            • {feature}
          </li>
        ))}
      </ul>
      {contactSales && (
        <button 
          onClick={handleContactClick}
          className="mt-3 xs:mt-4 bg-tertiary py-2 px-4 xs:px-6 sm:px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl text-[12px] xs:text-[14px] sm:text-[16px]"
        >
          Contact Sales
        </button>
      )}
    </motion.div>
  );
};

const ServiceSection = ({ title, plans }) => (
  <div className="relative z-10 w-full">
    <div className="bg-tertiary/30 backdrop-blur-sm py-2 px-2 mb-3 xs:mb-4 sm:mb-6 rounded-lg mx-auto w-[300px] xs:w-[340px] sm:w-[360px]">
      <h3 className="text-white font-bold text-[16px] xs:text-[18px] sm:text-[28px] text-center">
        {title}
      </h3>
    </div>
    <div className="flex flex-col items-center gap-3 xs:gap-4 sm:gap-6">
      {plans.map((plan, index) => (
        <PriceCard key={index} {...plan} />
      ))}
    </div>
  </div>
);
  

const PriceRange = () => {
  const services = {
    webDevelopment: {
      title: "Web Development",
      plans: [
        {
          title: "Basic",
          price: "300",
          features: [
            "Single page website",
            "Basic SEO",
            "Light and dark mode",
            "Basic functionalities",
            "Mobile Responsive",
            "1 week delivery"
          ]
        },
        {
          title: "Advanced",
          price: "500",
          features: [
            "Multiple page Website (up to 10 pages)",
            "Additional pages up to 20 ($50 each)",
            "Full SEO Package",
            "Mobile Responsive",
            "Custom Features",
            "2 Weeks Delivery"
          ],
          recommended: true
        },
        {
          title: "Enterprise",
          contactSales: true,
          features: [
            "Multiple page website (20+ pages)",
            "Full SEO Package",
            "Mobile Responsive",
            "Custom Features",
            "E-commerce Integration",
            "Multiple functionalities"
          ]
        }
      ]
    },
    webApps: {
      title: "Web Apps / SAAS",
      plans: [
        {
          title: "Starter",
          price: "1000",
          features: [
            "Simple web App",
            "Basic functionalities",
            "User Authentication",
            "Database connection",
            "Backend services"
          ]
        },
        {
          title: "Professional",
          price: "2000",
          features: [
            "Relatively complex web apps",
            "Backend linkage",
            "Database connection",
            "AI integration"
          ],
          recommended: true
        },
        {
          title: "Enterprise",
          price: "5000",
          features: [
            "All Professional features",
            "System Automations",
            "Advanced integrations",
            "Custom solutions"
          ]
        }
      ]
    },
    mobileApps: {
      title: "Mobile App Development",
      plans: [
        {
          title: "Single Platform",
          price: "5000",
          features: [
            "Frontend for Android or iOS",
            "Backend linked",
            "Database connected",
            "Payment system setup"
          ]
        },
        {
          title: "Cross Platform",
          price: "6000",
          features: [
            "Frontend for Android and iOS",
            "Backend linked",
            "Database connected",
            "Payment system setup"
          ],
          recommended: true
        },
        {
          title: "Enterprise",
          price: "10,000",
          features: [
            "All Cross Platform features",
            "2 months maintenance",
            "Priority support",
            "Custom integrations"
          ]
        }
      ]
    }
  };

  return (
    <div className="relative z-0 min-h-screen px-2 pb-6 xs:pb-8 sm:pb-0">
      <motion.div 
        variants={slideIn('down', 'tween', 0.2, 1)}
        className="relative z-10 mb-3 xs:mb-4 sm:mb-8"
      >
        <p className={`${styles.sectionSubText} text-center text-[14px] xs:text-[16px]`}>
          My Pricing
        </p>
        <h2 className={`${styles.sectionHeadText} text-center text-[24px] xs:text-[28px] sm:text-[32px]`}>
          Services & Rates.
        </h2>
      </motion.div>

      <div className="flex flex-col gap-4 xs:gap-6 sm:gap-8">
        {Object.values(services).map((service, index) => (
          <ServiceSection key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(PriceRange, "pricing");
