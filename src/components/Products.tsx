import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import productBlinds from "@/assets/product-blinds.jpg";
import productCurtains from "@/assets/product-curtains.jpg";
import productMotorized from "@/assets/product-motorized.jpg";
import GlowingCard from "./GlowingCard";

const products = [
  {
    id: 1,
    title: "Cortinas",
    description: "Elegância em tecidos nobres para qualquer ambiente.",
    image: productCurtains,
    types: ["Prega Macho", "Ilhós", "Wave", "Blackout"],
  },
  {
    id: 2,
    title: "Persianas",
    description: "Controle de luz com design moderno e funcional.",
    image: productBlinds,
    types: ["Romana", "Rolô", "Vertical", "Painel"],
  },
  {
    id: 3,
    title: "Motorizadas",
    description: "Automação inteligente para seu conforto.",
    image: productMotorized,
    types: ["Smart Home", "Controle Remoto", "App", "Sensores"],
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group h-full"
    >
      <GlowingCard className="h-full rounded-3xl">
        <div className="premium-card overflow-hidden bg-card rounded-3xl h-full flex flex-col">
          {/* Image Container - Fixed height */}
          <div className="relative h-64 md:h-72 overflow-hidden flex-shrink-0">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            
            {/* Floating Labels */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              {product.types.map((type, i) => (
                <motion.span
                  key={type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-card px-3 py-1 text-xs font-medium text-primary-foreground rounded-full backdrop-blur-md"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {type}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Content - Flex grow to fill remaining space */}
          <div className="p-5 md:p-6 flex flex-col flex-grow">
            <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-2">
              {product.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 flex-grow">
              {product.description}
            </p>
            <motion.a
              href="https://wa.me/5521983216443"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 text-sm md:text-base"
              whileHover={{ x: 5 }}
            >
              Saiba mais
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </GlowingCard>
    </motion.div>
  );
};

const Products = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section id="produtos" className="section-padding bg-muted/30">
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
            Nossos Produtos
          </span>
          <h2 className="section-title text-center mx-auto text-2xl md:text-4xl lg:text-5xl">
            Elegância em Cada Detalhe
          </h2>
          <p className="section-subtitle text-center mx-auto mt-3 text-sm md:text-lg max-w-xl">
            Coleção exclusiva com os mais altos padrões de qualidade.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 md:mt-16"
        >
          <motion.a
            href="https://wa.me/5521983216443"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar Orçamento
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
