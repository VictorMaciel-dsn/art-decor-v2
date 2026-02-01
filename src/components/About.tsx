import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";
import teamImage from "@/assets/team-working.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 40, suffix: "+", label: "Anos de Experiência" },
    { value: 5000, suffix: "+", label: "Projetos Realizados" },
    { value: 100, suffix: "%", label: "Satisfação Garantida" },
  ];

  return (
    <section id="sobre" className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs md:text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
              Nossa História
            </span>
            <h2 className="section-title mb-4 text-2xl md:text-4xl lg:text-5xl">
              Tradição e Excelência
            </h2>
            <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Há mais de 40 anos, a Art Decor é referência em cortinas e
                persianas sob medida em Teresópolis e região.
              </p>
              <p>
                Utilizamos materiais de alta qualidade e oferecemos atendimento
                personalizado do orçamento à instalação.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-primary mb-1">
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <div className="text-[10px] md:text-xs lg:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Image */}
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-xl"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={teamImage}
                alt="Equipe Art Decor instalando cortinas"
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              
              {/* Overlay Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
              >
                <div className="glass-card rounded-2xl p-4 md:p-6 backdrop-blur-md">
                  <p className="text-sm md:text-base lg:text-lg font-serif italic text-foreground leading-relaxed">
                    "Transformamos ambientes com elegância, criando espaços únicos."
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-serif font-semibold text-primary">
                        AD
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Equipe Art Decor
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Desde 1984
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Decoration */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary/10 rounded-3xl hidden md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
