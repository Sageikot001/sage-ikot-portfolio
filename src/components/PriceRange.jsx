import { motion } from 'framer-motion'
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'

const PriceCard = ({ title, price, features, recommended, contactSales }) => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={fadeIn('right', 'spring', 0.5, 0.75)}
      className={`bg-tertiary p-8 rounded-2xl w-full sm:w-[350px] ${
        recommended ? 'border-2 border-white' : ''
      }`}
    >
      <h3 className="text-white font-bold text-[24px]">{title}</h3>
      <p className="text-secondary text-[48px] font-bold mt-2">
        {contactSales ? 'Custom' : `$${price}`}
      </p>
      <ul className="mt-5 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-white-100">
            • {feature}
          </li>
        ))}
      </ul>
      {contactSales && (
        <button 
          onClick={handleContactClick}
          className="mt-4 bg-white text-tertiary py-2 px-4 rounded-lg font-bold hover:bg-opacity-90 transition-all"
        >
          Contact Sales
        </button>
      )}
    </motion.div>
  );
};

const ServiceSection = ({ title, plans }) => (
  <div className="mt-20">
    <h3 className="text-white font-bold text-[28px] mb-10">{title}</h3>
    <div className="flex flex-wrap justify-center gap-7">
      {plans.map((plan, index) => (
        <PriceCard key={index} {...plan} />
      ))}
    </div>
  </div>
)

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
  }

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Pricing</p>
        <h2 className={styles.sectionHeadText}>Services & Rates.</h2>
      </motion.div>

      {Object.values(services).map((service, index) => (
        <ServiceSection key={index} {...service} />
      ))}
    </>
  )
}

export default SectionWrapper(PriceRange, "pricing") 