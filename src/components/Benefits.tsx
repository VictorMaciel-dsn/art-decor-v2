import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, MapPin, Truck, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Qualidade Premium",
    description:
      "Materiais de primeira linha e acabamento impecável em cada peça.",
  },
  {
    icon: Sparkles,
    title: "Orçamento Gratuito",
    description:
      "Avaliação personalizada sem compromisso para seu projeto.",
  },
  {
    icon: Truck,
    title: "Instalação Profissional",
    description:
      "Equipe especializada para instalação perfeita e segura.",
  },
  {
    icon: MapPin,
    title: "Atendimento Regional",
    description:
      "Cobrimos Teresópolis e toda a região serrana do Rio de Janeiro.",
  },
];

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        className="glass-card p-8 rounded-2xl h-full text-center"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <benefit.icon className="w-8 h-8 text-primary" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-serif font-medium text-foreground mb-3">
          {benefit.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {benefit.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Benefits = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase mb-4 block">
            Por Que Nos Escolher
          </span>
          <h2 className="section-title text-center mx-auto">
            Vamos Até a Sua Casa
          </h2>
          <p className="section-subtitle text-center mx-auto mt-4">
            Oferecemos uma experiência completa e personalizada, do orçamento à
            instalação final.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
