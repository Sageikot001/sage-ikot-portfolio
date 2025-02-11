import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { send } from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  // s-e-ACkImLmrW9hjZ
// template_l898sc9
// service_0t54xft

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    send(
      "service_0t54xft", 
      "template_l898sc9", 
      {
        from_name: form.name,
        to_name: 'Ikot',
        from_email: form.email,
        to_email: 'sageikot@gmail.com',
        message: form.message
      },
      's-e-ACkImLmrW9hjZ'
      )
    .then(() => {
 setLoading(false);
 alert('Thank you. I will get back to you as soon as possible.');

      setForm({
        name:  '',
        email: '',
        message: '',
      })
      }, (error) => {
        setLoading(false)

        console.log(error);

        alert('Something went wrong.')
    })
  }

  return <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
    <motion.div variants={slideIn('left', "tween", 0.2, 1 )}
    className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
      <p className={styles.sectionSubText}>Get in touch</p>
      <h3 className={styles.sectionHeadText}>Contact.</h3>

      <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-12 flex flex-col gap-8"
      >
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4 "> Your Name</span>
          <input 
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="What's your name?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium "
          />

        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4 "> Your Email</span>
          <input 
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="What's your email?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium "
          />

        </label>
        <label className="flex flex-col">
          <span className="text-white font-medium mb-4 "> Your  Message</span>
          <textarea 
          rows="7"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="What do you want to say?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium "
          />

        </label>

        <button
        type="submit"
        className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>

        <div className=" flex justify-center gap-6">
      <a
        href="https://github.com/Sageikot001"
        target="_blank"
        rel="noopener noreferrer"
        className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
      >
        <img src="https://img.icons8.com/3d-fluency/100/github.png" alt="github" className="w-1/2 h-1/2 object-contain" />
      </a>
      <a
        href="https://www.linkedin.com/in/nsikakabasi-ikot-bb7434168/"
        target="_blank"
        rel="noopener noreferrer"
        className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
      >
        <img src="https://img.icons8.com/3d-fluency/100/linkedin--v2.png" alt="linkedin" className="w-1/2 h-1/2 object-contain" />
      </a>
      <a
        href="https://x.com/Ikotnsikak"
        target="_blank"
        rel="noopener noreferrer"
        className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
      >
        <img src="https://img.icons8.com/material-outlined/100/twitterx--v2.png" alt="twitter" className="w-1/2 h-1/2 object-contain" />
      </a>
      <a
        href="https://www.upwork.com/freelancers/~01f45ba51c73c37876?s=1110580755057594368"
        target="_blank"
        rel="noopener noreferrer"
        className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
      >
        <img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/100/external-upwork-a-global-freelancing-platform-where-professionals-connect-and-collaborate-remotely-logo-shadow-tal-revivo.png" alt="upwork" className="w-1/2 h-1/2 object-contain" />
      </a>
    </div>
      </form>
      
    </motion.div>

    <motion.div variants={slideIn('right', "tween", 0.2, 1 )}
    className="xl:flex-1 xl:h-[750px] md:h-[550px] h-[350px] "
    >
      <EarthCanvas />
    </motion.div>
  </div>;
};

export default SectionWrapper(Contact, "contact");
