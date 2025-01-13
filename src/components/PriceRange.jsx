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
      className={`bg-black-100 p-6 sm:p-8 rounded-2xl w-full max-w-[360px] ${
        recommended ? 'border-2 border-white' : ''
      }`}
    >
      <h3 className="text-white font-bold text-[20px] sm:text-[24px]">{title}</h3>
      <p className="text-secondary text-[28px] sm:text-[36px] font-bold mt-2">
        {contactSales ? 'Custom' : `$${price}`}
      </p>
      <ul className="mt-4 sm:mt-5 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-white-100 text-[14px] sm:text-[16px]">
            • {feature}
          </li>
        ))}
      </ul>
      {contactSales && (
        <button 
          onClick={handleContactClick}
          className="mt-4 bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
        >
          Contact Sales
        </button>
      )}
    </motion.div>
  );
};

const ServiceSection = ({ title, plans }) => (
  <div className="relative z-10 mt-8 sm:mt-20">
    <div className="bg-tertiary/30 backdrop-blur-sm py-3 sm:py-4 px-4 mb-6 sm:mb-8 rounded-lg mx-4">
      <h3 className="text-white font-bold text-[20px] sm:text-[28px] text-center">
        {title}
      </h3>
    </div>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 px-4 sm:px-0">
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
    <div className="relative z-0 pb-[120px] sm:pb-0">
      <motion.div 
        variants={slideIn('down', 'tween', 0.2, 1)}
        className="relative z-10 mb-8 sm:mb-16 px-4 sm:px-0"
      >
        <p className={`${styles.sectionSubText} text-center`}>
          My Pricing
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Services & Rates.
        </h2>
      </motion.div>

      <div className="flex flex-col gap-12 sm:gap-20">
        {Object.values(services).map((service, index) => (
          <ServiceSection key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(PriceRange, "pricing");
