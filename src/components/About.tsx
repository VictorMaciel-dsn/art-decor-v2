import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "40+", label: "Anos de Experiência" },
    { value: "5000+", label: "Projetos Realizados" },
    { value: "100%", label: "Satisfação Garantida" },
  ];

  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-primary tracking-widest uppercase mb-4 block">
              Nossa História
            </span>
            <h2 className="section-title mb-6">
              Tradição e Excelência em Cada Peça
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Com mais de 40 anos de tradição, a Art Decor é referência em
                cortinas e persianas sob medida em Teresópolis e região. Nosso
                compromisso com a excelência se reflete em cada detalhe das
                nossas peças.
              </p>
              <p>
                Utilizamos materiais de alta qualidade e técnicas refinadas de
                confecção para garantir que cada produto seja único e
                perfeitamente adaptado às suas necessidades e estilo.
              </p>
              <p>
                Nossa equipe especializada oferece atendimento personalizado,
                desde a escolha dos tecidos até a instalação final, garantindo
                uma experiência premium do início ao fim.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Element */}
            <div className="relative">
              {/* Main Card */}
              <motion.div
                className="glass-card p-8 md:p-12 rounded-3xl"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-8">
                  {/* Quote */}
                  <div className="relative">
                    <svg
                      className="absolute -top-4 -left-4 w-12 h-12 text-primary/20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed pl-8">
                      Transformamos ambientes com elegância e sofisticação,
                      criando espaços únicos que refletem a personalidade de
                      cada cliente.
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pl-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-serif font-semibold text-primary">
                        AD
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        Equipe Art Decor
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Desde 1984
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Background Decoration */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary/10 rounded-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
