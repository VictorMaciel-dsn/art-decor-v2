import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, MapPin, Truck, Sparkles } from "lucide-react";
import GlowingCard from "./GlowingCard";

const benefits = [
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Materiais de primeira linha em cada peça.",
  },
  {
    icon: Sparkles,
    title: "Orçamento Gratuito",
    description: "Avaliação personalizada sem compromisso.",
  },
  {
    icon: Truck,
    title: "Instalação Profissional",
    description: "Equipe especializada para instalação perfeita.",
  },
  {
    icon: MapPin,
    title: "Atendimento Regional",
    description: "Teresópolis e toda a região serrana.",
  },
];

const FloatingIcon = ({ icon: Icon, delay }: { icon: typeof Award; delay: number }) => {
  return (
    <motion.div
      className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-primary/10 flex items-center justify-center"
      animate={{
        y: [0, -6, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
    </motion.div>
  );
};

const BenefitCard = ({
  benefit,
  index,
}: {
  benefit: typeof benefits[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group h-full"
    >
      <GlowingCard className="h-full rounded-2xl">
        <motion.div
          className="glass-card p-6 md:p-8 rounded-2xl h-full text-center"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Floating Icon */}
          <FloatingIcon icon={benefit.icon} delay={index * 0.5} />

          {/* Content */}
          <h3 className="text-lg md:text-xl font-serif font-medium text-foreground mb-2 md:mb-3">
            {benefit.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {benefit.description}
          </p>
        </motion.div>
      </GlowingCard>
    </motion.div>
  );
};

const Benefits = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section id="contato" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-xs md:text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
            Por Que Nos Escolher
          </span>
          <h2 className="section-title text-center mx-auto text-2xl md:text-4xl lg:text-5xl">
            Vamos Até a Sua Casa
          </h2>
          <p className="section-subtitle text-center mx-auto mt-3 text-sm md:text-lg max-w-xl">
            Experiência completa do orçamento à instalação.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
