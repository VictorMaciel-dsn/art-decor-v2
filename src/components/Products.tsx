import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import productBlinds from "@/assets/product-blinds.jpg";
import productCurtains from "@/assets/product-curtains.jpg";
import productMotorized from "@/assets/product-motorized.jpg";

const products = [
  {
    id: 1,
    title: "Cortinas",
    description: "Elegância e sofisticação em tecidos nobres para transformar qualquer ambiente.",
    image: productCurtains,
    types: ["Prega Macho", "Ilhós", "Wave", "Blackout"],
  },
  {
    id: 2,
    title: "Persianas",
    description: "Controle de luz perfeito com designs modernos e funcionais.",
    image: productBlinds,
    types: ["Romana", "Rolô", "Vertical", "Painel"],
  },
  {
    id: 3,
    title: "Motorizadas",
    description: "Tecnologia e conforto com automação inteligente para sua casa.",
    image: productMotorized,
    types: ["Smart Home", "Controle Remoto", "App", "Sensores"],
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative"
    >
      <div className="premium-card overflow-hidden bg-card rounded-3xl">
        {/* Image Container */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          
          {/* Floating Labels */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {product.types.map((type, i) => (
              <motion.span
                key={type}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-card px-3 py-1 text-xs font-medium text-primary-foreground rounded-full"
              >
                {type}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3">
            {product.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.description}
          </p>
          <motion.a
            href="https://wa.me/5521983216443"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
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
    </motion.div>
  );
};

const Products = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="produtos" className="section-padding bg-muted/30">
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
            Nossos Produtos
          </span>
          <h2 className="section-title text-center mx-auto">
            Elegância em Cada Detalhe
          </h2>
          <p className="section-subtitle text-center mx-auto mt-4">
            Descubra nossa coleção exclusiva de cortinas e persianas,
            desenvolvida para atender aos mais exigentes padrões de qualidade.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://wa.me/5521983216443"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
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
